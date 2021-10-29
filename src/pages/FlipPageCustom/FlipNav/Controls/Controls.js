//global dependencies
import React, {useCallback, useEffect, useRef, useState} from "react";

//styles
import '../../pageFlip.css';
import "./styles.css";

// icons - start
import Pause from "../../../../images/controls/controlsPause.svg";
import Play from "../../../../images/controls/controlsPlay.svg";
import volume from "../../../../images/controls/controlsVolume.svg";
import rewindNextIcon from "../../../../images/controls/controlsRewindNext.svg";
import rewindBackIcon from "../../../../images/controls/controlsRewindBack.svg";
const Controls = (props) => {

  const [volumeOff, setVolumeOff] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volumeValue, setvolumeValue] = useState(0.5)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(props.currentBook.currentTime || 0)

  const audioRef = useRef();
  const audio = audioRef.current;
  const currentTimeRef = useRef(+currentTime);

  let currentBookSoundRegions = props.currentBook.bookSound.regions.find(item => item.data.pageNumber === +props.pageNum  );

  useEffect(() => {

    currentTimeRef.current = +currentTime;

    if(currentBookSoundRegions && (currentTimeRef.current  > Math.ceil(currentBookSoundRegions.end)) && currentBookSoundRegions.data.pageNumber === +props.currentBook.pageNumber) {
      props.setPageNumbersForOpenedBooks(+props.bookId, +props.nextPage + 1, props.currentBook.bookSound?.regions ? +props.currentRegionsOfNextPage.start : 0);
      props.onFlipToNext()

    }

    if(audio && +currentTime === +duration) {
      setIsPlaying(false)
      audio.pause()
    }
    // eslint-disable-next-line
  }, [currentTime, props.pageNum]);

  useEffect(()=> {
    setCurrentTime(props.currentBook.currentTime)

    // eslint-disable-next-line
  }, [props.currentBook.currentTime])

  const regionCreatedHandler = useCallback(
    () => {
      props.setCurrentTimeForListenedBook(props.currentBook.id, +currentTimeRef.current)
      // eslint-disable-next-line
    }, [currentTimeRef])

  useEffect(() => {

    return () => {regionCreatedHandler()}

    // eslint-disable-next-line
  },[])

  useEffect(() => {
    if(audio) {
      audio.currentTime = props.currentBook.currentTime

    }
    // eslint-disable-next-line
  }, [props.pageNum])

  // В момент переворачивания страницы
  useEffect(() => {
    if(audio && !audio.paused && props.bookState === 'flipping' && currentBookSoundRegions) {
      audio.pause()
      setIsPlaying(false)
      audio.currentTime = +currentBookSoundRegions.start - 2.2
    }

    if(audio && props.bookState === 'read' && !props.currentBook.isPause ) {
      audio.play()
      setIsPlaying(true)
    }
// eslint-disable-next-line
  }, [props.bookState])



  // audio - start

  const handleChange = (e) => {
    setvolumeValue(e.target.value)
    return audio.volume = e.target.value
  }

  const play = () => {

    if(props.currentBook.currentTime > 0) {
      audio.currentTime =  props.currentBook.currentTime ;
    }

    if(currentTime) {
      audio.currentTime = currentTime
    }

    if(!isPlaying) {
      props.setCurrentTimeForListenedBook(props.currentBook.id, +currentTimeRef.current)
      setIsPlaying(true)
      audio.play()
      if(+currentTime === +duration) {
        props.setPageNumbersForOpenedBooks(+props.bookId, 1,0)
      }
      props.setStateOfAudio(props.currentBook.id,false)
    }

    if(isPlaying) {
      props.setCurrentTimeForListenedBook(props.currentBook.id, +currentTimeRef.current)
      setIsPlaying(false)
      audio.pause();
      props.setStateOfAudio(props.currentBook.id,true)
    }

  }

  const rewindBack = () => {

    if(props.currentBook.currentTime > 0) {
      audio.currentTime = props.currentBook.currentTime;
    }

    if(audio.currentTime === 0) {
      Math.max(0, audio.currentTime -= 15)

    } else {
      audio.currentTime = props.currentBook.currentTime;
      Math.max(0, audio.currentTime -= 15)
    }

    if(( +audio.currentTime <= +currentBookSoundRegions.start.toFixed(1)) && props.pageNum !== 1) {
      props.onFlipToPrev()
    }

    props.setCurrentTimeForListenedBook(props.currentBook.id, +Math.max(0, audio.currentTime))
  }

  const rewindNext = () => {

    if(props.currentBook.currentTime > 0) {
      audio.currentTime = props.currentBook.currentTime;
    }

    if(audio.currentTime === 0) {
      audio.currentTime += 15
    } else {
      audio.currentTime = props.currentBook.currentTime;
      Math.min(+duration,  audio.currentTime += 15)
    }

    // В суловии текущее время не должно быть равно общему времени, иначе сработает условие на последней странице и будет ошибка.
    if(( audio.currentTime.toFixed(1) > +currentBookSoundRegions.end.toFixed(1)) && props.pageNum > 0) {
      props.setPageNumbersForOpenedBooks(+props.bookId, +props.nextPage + 1, props.currentBook.bookSound?.regions ? +props.currentRegionsOfNextPage.start : 0);
      props.onFlipToNext()
    } else {
      props.setCurrentTimeForListenedBook(props.currentBook.id, +Math.min(duration, audio.currentTime))
    }

  }

  function secondsToHms(seconds) {
    let duration;

    if (!seconds && !props.currentBook.currentTime ) {
      return '0 : 00'

    } else if (!seconds) {
      duration = Math.ceil(props.currentBook.currentTime)

    } else {
      duration = Math.ceil(seconds)
    }

    let hours = duration / 3600
    duration = duration % 3600

    let min = parseInt(duration / 60)
    duration = duration % 60

    let sec = parseInt(duration)

    if (sec < 10) {
      sec = `0${sec}`
    }
    if (min < 10) {
      min = `${min}`
    }

    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}h ${min}m ${sec}s`
    } else if (min === 0) {
      return `0 : ${sec}`
    } else {
      return `${min} : ${sec}`
    }
  }

  // audio -end

  return (
    <div className={`player`}>
      <audio src={props.currentBook.bookSound.file}
             ref={audioRef}
             onLoadedMetadata={(e) => {
               setDuration(e.currentTarget.duration.toFixed(1))
             }}
             onTimeUpdate={ (e) => {
               setCurrentTime(e.currentTarget.currentTime.toFixed(1));
             } }
      />
      <div className={`controls`}>
        <div onClick={play} className={`controlPlay`}>
          {
            isPlaying ? <img src={Pause} alt="player controls"/> : <img src={Play} alt="player controls"/>
          }
        </div>
        <div onClick={() => {
          setVolumeOff(!volumeOff)
        }} className={`controlVolume`}>
          <img src={volume} alt="player controls"/>
          {volumeOff && (
            <input onChange={handleChange} className={`volumeRange`} type="range" min={0.1}
                   value={+volumeValue} step={0.1} max={1.0}/>
          )}
        </div>
        <div onClick={rewindBack} className={`controlRewindPrev`}>
          <img src={rewindBackIcon} alt="player controls"/>
        </div>
        <div onClick={rewindNext} className={`controlRewindNext`}>
          <img src={rewindNextIcon} alt="player controls"/>
        </div>
      </div>

      <div className={`playerTimer`}>
        <span>{secondsToHms(currentTime)}</span>
        <span className={`delimeter`} > / </span>
        <span>{secondsToHms(duration)}</span>
      </div>

    </div>
  )
}

export default Controls;























// import React, {useCallback, useEffect, useRef, useState} from "react";
// import { useHistory } from "react-router-dom";
//
// import classes from "./styles.css";
// // icons - start
// import Pause from "../../../images/controlsPause.svg";
// import Play from "../../../images/controlsPlay.svg";
// import volume from "../../../images/controlsVolume.svg";
// import rewindNextIcon from "../../../images/controlsRewindNext.svg";
// import rewindBackIcon from "../../../images/controlsRewindBack.svg";
// // icons - end
//
// const Controls = (props) => {
//
//   const [volumeOff, setVolumeOff] = useState(false)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [volumeValue, setvolumeValue] = useState(0.5)
//   const [duration, setDuration] = useState(0)
//   const [currentTime, setCurrentTime] = useState(props.currentBook.currentTime)
//
//   const history = useHistory();
//
//   const audioRef = useRef();
//   const audio = audioRef.current;
//   const currentTimeRef = useRef(+currentTime);
//
//   let currentBookSoundRegions = props.currentBook.bookSound.regions.find(item => item.data.pageNumber === +props.pageNum);
//
//   useEffect(() => {
//     currentTimeRef.current = +currentTime;
//     if(+currentTimeRef.current > +currentBookSoundRegions.end) {
//       props.setPageNumbersForOpenedBooks(+props.bookId, !props.pageNum ? 1 : `${props.nextPage}`,+currentTimeRef.current)
//       history.push(`/book/${+props.bookId}/${!props.pageNum ? 1 : props.nextPage}`)
//     }
//
//     if(audio && +currentTime === +duration) {
//       setIsPlaying(false)
//       audio.pause()
//     }
//
//     // console.log(currentBookSoundRegions)
//     // if(currentBookSoundRegions) {
//     //   setDuration(audio.duration)
//     //   console.log(audio.duration)
//     // }
//
//     // eslint-disable-next-line
//   }, [currentTime]);
//
//   useEffect(()=> {
//     setCurrentTime(props.currentBook.currentTime)
//
//     // eslint-disable-next-line
//   }, [props.currentBook.currentTime])
//
//   const regionCreatedHandler = useCallback(
//     () => {
//       props.setCurrentTimeForListenedBook(props.currentBook.id, +currentTimeRef.current)
//
//       // eslint-disable-next-line
//     }, [currentTimeRef])
//
//   useEffect(() => {
//     return () => {regionCreatedHandler()}
//     // eslint-disable-next-line
//   },[])
//
//   useEffect(() => {
//     if(audio) {
//       audio.currentTime = props.currentBook.currentTime
//     }
//     // eslint-disable-next-line
//   }, [props.pageNum])
//
//   // audio - start
//
//   const handleChange = (e) => {
//     setvolumeValue(e.target.value)
//     return audio.volume = e.target.value
//   }
//
//   const play = () => {
//
//     if(props.currentBook.currentTime > 0) {
//       audio.currentTime =  props.currentBook.currentTime ;
//     }
//
//     if(currentTime) {
//       audio.currentTime = currentTime
//     }
//
//     if(!isPlaying) {
//       props.setCurrentTimeForListenedBook(props.currentBook.id, +currentTimeRef.current)
//       setIsPlaying(true)
//       audio.play()
//       if(+currentTime === +duration) {
//         props.setPageNumbersForOpenedBooks(+props.bookId, 1,0)
//         history.push(`/book/${+props.bookId}/${1}`)
//       }
//     }
//
//     if(isPlaying) {
//       props.setCurrentTimeForListenedBook(props.currentBook.id, +currentTimeRef.current)
//       setIsPlaying(false)
//       audio.pause();
//     }
//
//   }
//
//   const rewindBack = () => {
//
//     if(props.currentBook.currentTime > 0) {
//       audio.currentTime = props.currentBook.currentTime;
//     }
//
//     if(audio.currentTime === 0) {
//       Math.max(0, audio.currentTime -= 15)
//
//     } else {
//        audio.currentTime = props.currentBook.currentTime;
//        Math.max(0, audio.currentTime -= 15)
//     }
//
//     if(( audio.currentTime < +currentBookSoundRegions.start) && props.pageNum !== 1) {
//       props.setPageNumbersForOpenedBooks(+props.bookId, +props.pageNum === 1 ? '' : `${+props.prevPage}`, +Math.max(0, audio.currentTime));
//       history.push(`/book/${+props.bookId}/${!props.pageNum ? 1 : props.prevPage}`)
//     }
//
//     props.setCurrentTimeForListenedBook(props.currentBook.id, +Math.max(0, audio.currentTime))
//   }
//
//   const rewindNext = () => {
//     if(props.currentBook.currentTime > 0) {
//       audio.currentTime = props.currentBook.currentTime;
//     }
//
//     if(audio.currentTime === 0) {
//        Math.min(duration, audio.currentTime += 15)
//     } else {
//       audio.currentTime = props.currentBook.currentTime;
//       Math.min(duration,  audio.currentTime += 15)
//     }
//
//     if(( +audio.currentTime.toFixed(1) >= +currentBookSoundRegions.end.toFixed(1)) && props.pageNum !== 1) {
//       props.setPageNumbersForOpenedBooks(+props.bookId, +props.pageNum === 1 ? '' : `${+props.nextPage}`, +Math.max(0, audio.currentTime));
//       history.push(`/book/${+props.bookId}/${!props.pageNum ? 1 : props.nextPage}`)
//     }
//
//     if(Math.ceil(+duration) !== Math.ceil(+currentTimeRef.current)) {
//       props.setCurrentTimeForListenedBook(props.currentBook.id, +Math.min(duration, audio.currentTime))
//     }
//   }
//
//   function secondsToHms(seconds) {
//     let duration;
//
//     if (!seconds && !props.currentBook.currentTime ) {
//       return '0 : 00'
//
//     } else if (!seconds) {
//       duration = Math.ceil(props.currentBook.currentTime)
//
//     } else {
//       duration = Math.ceil(seconds)
//     }
//
//     let hours = duration / 3600
//     duration = duration % 3600
//
//     let min = parseInt(duration / 60)
//     duration = duration % 60
//
//     let sec = parseInt(duration)
//
//     if (sec < 10) {
//       sec = `0${sec}`
//     }
//     if (min < 10) {
//       min = `${min}`
//     }
//
//     if (parseInt(hours, 10) > 0) {
//       return `${parseInt(hours, 10)}h ${min}m ${sec}s`
//     } else if (min === 0) {
//       return `0 : ${sec}`
//     } else {
//       return `${min} : ${sec}`
//     }
//   }
//
//   // audio -end
//
//   return (
//     <div className={classes.player}>
//       <audio src={props.currentBook.bookSound.file}
//              ref={audioRef}
//              onLoadedMetadata={(e) => {
//                setDuration(e.currentTarget.duration.toFixed(1))
//
//              }}
//              onTimeUpdate={ (e) => {
//                setCurrentTime(e.currentTarget.currentTime.toFixed(1));
//
//                // if(Math.ceil(+duration) === Math.ceil(e.currentTarget.currentTime)) {
//                //   setIsPlaying(false)
//                //   audio.pause()
//                //   }
//              } }
//       />
//       <div className={classes.controls}>
//         <div onClick={play} className={classes.controlPlay}>
//           {
//             isPlaying ? <img src={Pause} alt="player controls"/> : <img src={Play} alt="player controls"/>
//           }
//         </div>
//         <div onClick={() => {
//           setVolumeOff(!volumeOff)
//         }} className={classes.controlVolume}>
//           <img src={volume} alt="player controls"/>
//           {volumeOff && (
//             <input onChange={handleChange} className={classes.volumeRange} type="range" min={0.1}
//                    value={+volumeValue} step={0.1} max={1.0}/>
//           )}
//         </div>
//         <div onClick={rewindBack} className={classes.controlRewindPrev}>
//           <img src={rewindBackIcon} alt="player controls"/>
//         </div>
//         <div onClick={rewindNext} className={classes.controlRewindNext}>
//           <img src={rewindNextIcon} alt="player controls"/>
//         </div>
//       </div>
//
//         <div className={classes.playerTimer}>
//           <span>{secondsToHms(currentTime)}</span>
//           <span className={classes.delimeter} > / </span>
//           <span>{secondsToHms(duration)}</span>
//         </div>
//
//     </div>
//   )
// }
//
// export default Controls;