import React from 'react';

import arrow from "../../../images/icons/book-arrow.svg";
import Controls from "./Controls/Controls";

const FlipNav = (props) => {

  //По клику на кнопку назад, фиксируем предыдущую страницу
  let prevButtonClick = () => {
     props.setPageNumbersForOpenedBooks(+props.bookId, Math.max(+props.prevPage - 1, 0), ((props.currentBook.bookSound?.regions && props.currentBook.bookSound?.regions.length > 0) && props.currentPageNum > 1) ? props.currentRegionsOfPrevPage.start : 0);
    if (props.flipRef && props.flipRef.current.pageFlip()) {
      props.flipRef.current.pageFlip().flipPrev();
    }
  }

  //По клику на кнопку вперед, фиксируем слудющую страницу
  let nextButtonClick = () => {
     props.setPageNumbersForOpenedBooks(+props.bookId, +props.nextPage + 1, (props.currentBook.bookSound?.regions && props.currentBook.bookSound.regions.length > 0) ? +props.currentRegionsOfNextPage.start : 0);
    if (props.flipRef && props.flipRef.current.pageFlip()) {
      props.flipRef.current.pageFlip().flipNext()
    }
  }

  return (
    <div className="page-flip-box">
      <button className={props.currentPageNum === 0 ? 'flip-page-arrow prev hidden' : `flip-page-arrow prev`}
              type="button" onClick={prevButtonClick}>
        <img src={arrow} alt="previous page"/>
      </button>
      {
        (+props.currentBook.pageNumber > 0 && props.currentBook.bookSound?.regions && props.currentBook.bookSound?.regions.length > 0) && (
          <Controls {...props} />
        )
      }
      {
        props.currentPageNum > 0 && (
          <div className="flip-page-count-pages">
            <span>{`${+props.currentPageNum} - ${+props.currentPageNum + 1}`}</span>
            of
            <span>{props.totalPages}</span>
          </div>
        )
      }
      <button
        className={+props.currentPageNum + 1 === props.totalPages ? 'flip-page-arrow next hidden' : 'flip-page-arrow next'}
        type="button" onClick={nextButtonClick}>
        <img src={arrow} alt="next page"/>
      </button>
    </div>
  );
};

export default FlipNav;