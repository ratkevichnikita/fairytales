//global dependencies
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {
  getBookPagesAll,setBookPagesAll,
  setMakeChoose, setCurrentTimeForListenedBook,
  setPageNumbersForOpenedBooks,
} from "../../redux/FairytalesListReducer";

//components
import FlipPageCustom from "../FlipPageCustom/FlipPageCustom";

const FairytalesPageContainer = (props) => {

  let bookId = props.match.params.bookId;
  // let pageNum = props.match.params.pageNum;
  // let currentBookID = props.touchedBooks.map(item => item.id === Number(bookId) ? item.isReading : null).map(item => item).join('')

  useEffect(() => {
    props.getBookPagesAll(bookId)

    return () => {
      props.setBookPagesAll([])
    }

    // eslint-disable-next-line
  }, [bookId])

  return (
    <FlipPageCustom {...props} />
  )
}

let withRouterFairytalePageContainer = withRouter(FairytalesPageContainer);

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
   getBookPagesAll, setMakeChoose,
  setPageNumbersForOpenedBooks,
  setCurrentTimeForListenedBook, setBookPagesAll
})(withRouterFairytalePageContainer)