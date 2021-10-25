import {connect} from "react-redux";
import FairytalesList from "./FairytalesList";
import {
  getBooksList,
  setBooksFromSearch, setFavoritesBooks, setIdOfCurrentBookForBuy,
  setTouchedBooks
} from "../../redux/FairytalesListReducer";
import React, {useEffect} from "react";
import { withRouter } from "react-router";
import {getBooksFromSorting, getGenres} from "../../redux/sortingReducers";

const FeirytalesListContainer = (props) => {

  let currentBookId
  if(props.touchedBooks.length > 0) {
    currentBookId = props.touchedBooks.map(item => item.id)
  }

  useEffect(() => {
    return () => {setIdOfCurrentBookForBuy(null)}
    // eslint-disable-next-line
  },[])

  // загрузить книги из поиска
  useEffect(() => {
    if(props.booksListFromSearch.length > 0) {
      props.setBooksFromSearch(props.booksListFromSearch)
    }
    // eslint-disable-next-line
  }, [props.booksListFromSearch ])

  useEffect(() => {
    if(props.books.length > 0) {
      props.getGenres()
    }
    // eslint-disable-next-line
  },[props.books.length])

  return (
    <FairytalesList {...props} currentBookId={currentBookId} />
  )
}

let withRouterFeirytalesListContainer = withRouter(FeirytalesListContainer)

let mapStateToProps = (state) => {
  return {
    books: state.fairytalesList.books,
    touchedBooks: state.fairytalesList.touchedBooks,
    booksListFromSearch:state.searching.booksListFromSearch,
    booksListFromSorting: state.sorting.booksListFromSorting,
    showFreeBooks: state.fairytalesList.showFreeBooks,
    sortByTextAndAudio: state.sorting.sortByTextAndAudio,
    isAuth: state.login.isAuth,
    favoritesList: state.fairytalesList.favoritesList,
    selectedGenreId: state.sorting.selectedGenre.genreId,
    selectedAuthorName: state.sorting.selectedAuthorName,
    isFetchingToggle: state.fairytalesList.isFetchingToggle,
  }
}

export default connect(mapStateToProps, {getBooksList,setBooksFromSearch,getBooksFromSorting,setTouchedBooks,setFavoritesBooks,setIdOfCurrentBookForBuy,getGenres})(withRouterFeirytalesListContainer)