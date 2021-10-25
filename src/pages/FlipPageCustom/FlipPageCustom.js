//global dependencies
import React, {useCallback, useEffect, useRef, useState} from 'react';
import HTMLFlipBook from "react-pageflip";

//styles
import './pageFlip.css';

//components
import classes from "../FairytalePage/FairytalePage.module.css";
import Header from "../../components/Header/Header";
import FlipNav from "./FlipNav/FlipNav";
import listenBook from "../../images/controls/audiobook.svg";
import {setTotalPagesForCurrentBook} from "../../redux/FairytalesListReducer";
import {useSelector} from "react-redux";
import Preloader from "../../common/Preloader/Preloader";

//images - start

const FlipPageCustom = React.memo((props) => {

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }

  let innerHeight = useWindowDimensions().height;
  let innerHeightCalc = innerHeight > 800 ? 640 : innerHeight - 160;
  let innerWidthCalc = innerHeight * 0.55 > 480 ? 480 : innerHeight * 0.55;

  console.log('innerWidthCalc',innerWidthCalc)
  console.log('innerHeightCalc',innerHeightCalc)






  let bookId = props.match.params.bookId;
  const isFetching = useSelector(state => state.fairytalesList.isFetchingToggle)
  // Все данные по конкретной книге, которую сейчас просматривают
  let currentBook = props.touchedBooks.find(item => item.id === +bookId);
  let currentRegionsStart;
  let currentRegionsOfNextPage;
  let currentRegionsOfPrevPage;

  // Получаем ref на нашу книгу
  let flipRef = useRef(null);
  // Устанавливаем номер текущей страницы
  const [currentPageNum, setCurrentPageNum] = useState(currentBook.pageNumber || 0);
  // Общее количество страниц
  const [totalPages, setTotalPages] = useState(currentBook.totalPages || 0);
  // какой % книги прочитан/прослушан
  const [progress, setProgress] = useState(+currentBook.progress);
  // Записываем состояние книги: момент переворачивания страницы, когда книга читается
  const [bookState, setBookState] = useState('');
  // Номер следующей страницы для предачи в redux
  let nextPage = Math.min(+currentPageNum === 0 ? +currentPageNum : (+currentPageNum + 1), totalPages);
  // Номер предыдущей страницы для предачи в redux
  let prevPage = Math.max((+currentPageNum - 1), 0);

  // Фиксируем прогресс считаем сколько страниц прочитано от общего количества страниц
  useEffect(() => {
    let readingProgress = Math.floor((+currentPageNum + 1) / totalPages * 100);
    if(currentPageNum === 0) {
      readingProgress = 0
    }
    setProgress(readingProgress !== Infinity ? readingProgress : 0 )
    if(currentPageNum > 0) {
      props.setPageNumbersForOpenedBooks(+bookId,  currentPageNum ?`${+currentPageNum}` : '', +currentBook.currentTime, progress);
    }
    return () => {
      setProgress(readingProgress || 0 );
      props.setPageNumbersForOpenedBooks(+bookId,  currentPageNum ?`${+currentPageNum}` : '', +currentBook.currentTime, progress);
    }
    // eslint-disable-next-line
  }, [currentPageNum, props.bookPagesSort,progress])

  // Если страница книга === 0 то добавляем класс ( который скрывает фон книги )
  useEffect(() => {
    if(currentPageNum === 0) {
      document.querySelector('.flip-page-parent').closest('.page-flip-wrapper').classList.add('bookStart')
    } else {
      document.querySelector('.flip-page-parent').closest('.page-flip-wrapper').classList.remove('bookStart')
    }
    // eslint-disable-next-line
  }, [currentPageNum])

  if (currentBook.bookSound?.regions) {
    currentRegionsOfNextPage = currentBook.bookSound.regions.find(item => item.data.pageNumber === +nextPage + 1);
    currentRegionsOfPrevPage = currentBook.bookSound.regions.find(item => item.data.pageNumber === +prevPage - 1);
  }

  // Render всех страниц, которые к нам пришли
  let flipPages = props.bookPagesSort.map((item, idx) => {
    // добавляем класс на первую страницу и на обложку
    let bookPageClassName = '';
    if(item.pageNumber > 0) {
      bookPageClassName = 'flip-page';
    } else {
      bookPageClassName = 'page page-cover';
    }
    if(item.pageNumber === 1) {
      bookPageClassName = 'flip-page first-page';
    }
    return (
      // Страница с 0 индексом становится обложкой
      <div key={item.pageNumber} className={bookPageClassName}>
        <div className="flip-page-inner">
          { item.blocks ? item.blocks.map((block,index) =>  {
            if(block.type === 'paragraph') {
              return <p key={index} dangerouslySetInnerHTML={{__html: block.data.text}}/>
            } else if (block.type === 'image') {
              return  <img key={index} src={`${block.data.file.url}`} alt=""/>
            } else {
              return null
            }
          }) : null}
        </div>
        <>
          { item.pageNumber > 0
            ? <div className="flip-page-number">{item.pageNumber}</div>
            : <div className="page-cover-title">
              {`${currentBook.title}`}
              <div className={classes.authorName}>
                <span>{currentBook.author}</span>
              </div>
            </div>
          }
        </>
      </div>
    )
  })

  // В момент перелистываения страницы записываем в стейт номер текущей страницы
  const onPageTurn = (e) => {
    if (currentBook.bookSound?.regions) {
      currentRegionsStart = currentBook.bookSound.regions.find(item => item.data.pageNumber === +e.data);

      props.setPageNumbersForOpenedBooks(+bookId, e.data, ( (currentBook.bookSound?.regions && currentBook.bookSound.regions.length > 0) && e.data > 1 ) ? currentRegionsStart.start : 0);
      // props.setPageNumbersForOpenedBooks(+props.bookId, +props.nextPage + 1, (props.currentBook.bookSound?.regions && props.currentBook.bookSound.regions.length > 0) ? +props.currentRegionsOfNextPage.start : 0);
    }
    setCurrentPageNum(e.data)
  }

  // В момент переворачиная страницы добавлять и удаляем класс с родиля всей книги, по нему стрелки вперед/назад становятся неактивные
  const onChangeState = (state) => {
    setBookState(state)
    if (state === 'flipping' && flipRef && flipRef.current) {
      document.querySelector('.flip-page-parent').classList.add('isFlipping')
    }
    if (state !== 'flipping' && flipRef && flipRef.current) {
      document.querySelector('.flip-page-parent').classList.remove('isFlipping')
    }
  }

  // Дополнительная проверка необходимая, для того что бы реакт видел страницы
  const onInit = useCallback(() => {

    if (flipRef && flipRef.current) {
      setTotalPages(flipRef.current.pageFlip().getPageCount() - 1);
      props.setTotalPagesForCurrentBook(currentBook.id, props.bookPagesSort.length)
      // props.setTotalPagesForCurrentBook(currentBook.id,(flipRef.current.pageFlip().getPageCount() - 1))
      flipRef.current.pageFlip().turnToPage(+currentPageNum)
    }
    // eslint-disable-next-line
  }, [currentPageNum]);

  let onFlipToNext = () => {
    if (flipRef && flipRef.current) {
      flipRef.current.pageFlip().flipNext()
    }
  }

  let onFlipToPrev = () => {
    if (flipRef && flipRef.current) {
      flipRef.current.pageFlip().flipPrev()
    }
  }

  return (
    <div className="flip-page-container">
      <div className="wrapper">
        <div className="flip-page-content">
          <div className="flip-page-header">
            <Header startPage={props.startPage} hideSearch={props.hideSearch}/>
            {/*<div style={{color:'#fff'}}>*/}
            {/*    <p>innerHeightCalc {innerHeightCalc}</p>*/}
            {/*    <p>innerWidthCalc {innerWidthCalc}</p>*/}
            {/*</div>*/}
          </div>
          {
            isFetching
              ? <Preloader />
              : <div className={currentPageNum >= 3 ? `page-flip-wrapper static-bg` :`page-flip-wrapper`}>
                <HTMLFlipBook
                  width={innerWidthCalc}
                  minWidth={115}
                  maxWidth={innerWidthCalc}
                  height={innerHeightCalc}
                  maxHeight={640}
                  minHeight={300}
                  ref={flipRef}
                  onChangeState={(e) => onChangeState(e.data)}
                  className="flip-page-parent"
                  onInit={onInit}
                  size="stretch"
                  onFlip={(e) => onPageTurn(e)}
                  mobileScrollSupport={true}
                  showCover={true}
                  renderOnlyPageLengthChange={true}
                >
                  {
                    flipPages
                  }
                </HTMLFlipBook>
                <FlipNav {...props} currentBook={currentBook} flipRef={flipRef} onFlipToNext={onFlipToNext}
                         currentRegionsOfNextPage={currentRegionsOfNextPage}
                         currentRegionsOfPrevPage={currentRegionsOfPrevPage} currentPageNum={currentPageNum}
                         pageNum={currentPageNum} bookId={bookId} prevPage={prevPage} nextPage={nextPage}
                         progress={progress} setProgress={setProgress} totalPages={totalPages} onFlipToPrev={onFlipToPrev}
                         bookState={bookState}  />
              </div>
          }
        </div>
      </div>
    </div>
  );
});

export default FlipPageCustom;