//global dependencies
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {
  getBookPagesAll, setBookPagesAll,
  setMakeChoose, setCurrentTimeForListenedBook,
  setPageNumbersForOpenedBooks, setStateOfAudio,
  setTotalPagesForCurrentBook,
} from "../../redux/FairytalesListReducer";

//components
import FlipPageCustom from "./FlipPageCustom";

const FlipPageCustomContainer = (props) => {

  let bookId = props.match.params.bookId;


  let bookPagesSort = props.bookPagesAll.sort((a, b) => a.pageNumber - b.pageNumber);
     useEffect(() => {
       bookPagesSort.unshift({isCover:true,title:'title',pageNumber: 0});
     },[bookPagesSort])

  useEffect(() => {
    props.getBookPagesAll(bookId)

    return () => {
      props.setBookPagesAll([])
    }

    // eslint-disable-next-line
  }, [bookId])

  return (
       <FlipPageCustom {...props} bookPagesSort={bookPagesSort} />
  )
}

let withRouterFlipPageCustomContainer = withRouter(FlipPageCustomContainer);

let mapStateToProps = (state) => {
  return {
    books: state.fairytalesList.books,
    bookPages: state.fairytalesList.bookPages,
    hideSearch: state.fairytalesList.hideSearch,
    bookPagesAll: state.fairytalesList.bookPagesAll,
    startPage: state.fairytalesList.startPage,
    touchedBooks: state.fairytalesList.touchedBooks,
    setBookPagesAll: state.fairytalesList.setBookPagesAll,
  }
}

export default connect(mapStateToProps, {
  getBookPagesAll,
  setPageNumbersForOpenedBooks,
  setCurrentTimeForListenedBook, setBookPagesAll,
  setStateOfAudio, setTotalPagesForCurrentBook,
})(withRouterFlipPageCustomContainer)