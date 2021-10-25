//global dependencies
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

//components
import Header from "../../components/Header/Header";
import Controls from "../FlipPageCustom/FlipNav/Controls/Controls";

//styles
import classes from './FairytalePage.module.css';

//images - start
import arrow from '../../images/icons/book-arrow.svg';
import listenBook from '../../images/controls/audiobook.svg';

const FairytalePage = (props) => {

  let bookId = props.match.params.bookId;
  let pageNum = props.match.params.pageNum;

  let currentBook = props.touchedBooks.find(item => item.id === +bookId);

  const [progress, setProgress] = useState(currentBook.progress);

  let booksPagesList1;
  let booksPagesList2;
  let currentRegionsOfNextPage;
  let currentRegionsOfPrevPage;
  let bookPagesLength = props.bookPagesAll.length - 1;

  let nextPage = Math.min((+pageNum + 2), bookPagesLength);
  let prevPage = Math.max((+pageNum - 2), 1);

  if (props.bookPagesAll.length > 0 && pageNum) {

    if(currentBook.bookSound && currentBook.bookSound.regions) {
      currentRegionsOfNextPage = currentBook.bookSound.regions.find(item => item.data.pageNumber === +nextPage);
      currentRegionsOfPrevPage = currentBook.bookSound.regions.find(item => item.data.pageNumber === +prevPage);
    }

    let bookPagesSort = props.bookPagesAll.sort((a, b) => a.pageNumber - b.pageNumber);

    let firstPage = bookPagesSort.filter(item => item.pageNumber === +pageNum );
    let secondPage = bookPagesSort.filter(item => item.pageNumber === +pageNum + 1);

    booksPagesList1 = firstPage[0].blocks.map((item, index) => {

      if (item.type === 'paragraph') {
        return <p key={index} dangerouslySetInnerHTML={{__html: item.data.text}}/>
      }
      if (item.type === 'image') {
        return (
          <img key={index} src={`${item.data.file.url}`} alt=""/>
        )
      } else {
        return  null
      }
    })

    booksPagesList2 = secondPage[0].blocks.map((item, index) => {

      if (item.type === 'paragraph') {
        return <p key={index} dangerouslySetInnerHTML={{__html: item.data.text}}/>
      }
      if (item.type === 'image') {
        return (
          <img key={index} src={`${item.data.file.url}`} alt=""/>
        )
      }
      return null
    })
  }

  useEffect(() => {
    let readingProgress = Math.floor(+pageNum / bookPagesLength * 100);
    setProgress(readingProgress || 0 )
    if(pageNum > 0) {
      props.setPageNumbersForOpenedBooks(+bookId,  pageNum ?`${+pageNum}` : '', +currentBook.currentTime, progress);
    }
    return () => {
      setProgress(readingProgress || 0 );
      props.setPageNumbersForOpenedBooks(+bookId,  pageNum ?`${+pageNum}` : '', +currentBook.currentTime, progress);
    }
  }, [pageNum, bookPagesLength,progress])

  return (
    <div className={classes.container}>
      <div className="wrapper">
        <div className={classes.content}>
          <div className={classes.header}>
            <Header startPage={props.startPage} hideSearch={props.hideSearch}/>
          </div>
          <div className={classes.body}>
            <div className={classes.bodyWrap}>
              <div className={classes.pages}>
                <div className={classes.page}>
                  <div className={`${classes.innerContent} ${classes.leftPage}`}>
                    {
                      (currentBook.isReading || currentBook.isListen) && pageNum
                        ? booksPagesList1
                        : <div className={classes.bookStart}>
                          <div className={classes.bookTitle}>
                            <h1>
                              {currentBook.title}
                            </h1>
                            <div className={classes.authorName}>
                              <span>{currentBook.author}</span>
                            </div>
                          </div>
                          <div className={classes.btns}>
                            { (currentBook.bookSound && currentBook.bookSound.regions) && (
                              <Link to={`/book/${bookId}/${1}`}
                                    className={`${classes.link} ${classes.link1}`} onClick={() => {
                                props.setMakeChoose(+bookId, false, true, 1)
                              }}>Les selv</Link>
                            )}
                            <Link to={`/book/${bookId}/${1}`}
                                  className={`${classes.link} ${classes.link2}`} onClick={() => {
                              props.setMakeChoose(+bookId, true, false, 1)
                            }}>Les for meg</Link>
                          </div>
                        </div>
                    }
                  </div>
                </div>
                <div className={classes.page}>
                  <div className={classes.innerContent}>
                    {
                      (currentBook.isReading || currentBook.isListen) && pageNum
                        ? booksPagesList2
                        : <div className={classes.startImage}>
                            <img src={currentBook.image} alt="fairytale"/>
                          </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          {pageNum && (
            <div className={classes.navigation}>
              <div className={classes.prev}>
                <Link
                  to={`/book/${bookId}/${+pageNum === 1 ? '' : prevPage}`}
                  onClick={() => {
                    props.setPageNumbersForOpenedBooks(+bookId, +pageNum === 1 ? '' : `${+prevPage}`, currentBook.bookSound?.regions ? +currentRegionsOfPrevPage.start : 0,progress);
                  }}
                  className={!pageNum ? `${classes.linkHidden}` : ''}
                >
                  <img src={arrow} alt="arrow"/>
                </Link>
              </div>
              {
                (currentBook.isListen && currentBook.bookSound.regions) && (
                 <Controls {...props} currentBook={currentBook} pageNum={pageNum} bookId={bookId} prevPage={prevPage} nextPage={nextPage} progress={progress} setProgress={setProgress}  />
                )
              }
                  <>
                    {
                      (currentBook.bookSound && currentBook.bookSound.regions && currentBook.isReading) && (
                        <div onClick={() => { props.setMakeChoose(+bookId, false, true, pageNum, false)}} className={classes.listenBook}><img src={listenBook} alt=""/></div>
                      )
                    }
                    <div className={classes.pagesCount}>
                      <span className={classes.currentPage}>{pageNum}</span>
                      <span className={classes.delimetr}>of</span>
                      <span className={classes.TotalPages}>{bookPagesLength} <span>pages</span></span>
                    </div>
                  </>
              {
                nextPage !== +pageNum
                  ? <div className={classes.next}>
                      <Link to={`/book/${bookId}/${!pageNum ? 1 : nextPage}`}
                            onClick={() => {props.setPageNumbersForOpenedBooks(+bookId, !pageNum ? 1 : `${nextPage}`, currentBook.bookSound?.regions ? +currentRegionsOfNextPage.start : 0 , progress)}}>
                        <img src={arrow} alt="arrow"/>
                      </Link>
                    </div>
                  : <svg width={40} height={40}/>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FairytalePage;