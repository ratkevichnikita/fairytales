import {searchAPI} from "../api/api";

const SET_BOOK_TITLE = 'SET_BOOK_TITLE';
const SET_BOOK_FROM_SEARCH = 'SET_BOOK_FROM_SEARCH';
const CLEAR_BOOKS_LIST_FROM_SEARCH = 'CLEAR_BOOKS_LIST_FROM_SEARCH';
const SET_SORTING_RESULTS = 'SET_SORTING_RESULTS';
const SET_FOCUS_ON_SEARCH = 'SET_FOCUS_ON_SEARCH';

let initialState = {
  bookTitle: '',
  booksListFromSearch: [],
  sortingResults: '',
  inFocus: false
}

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK_TITLE:
      return {
        ...state,
        bookTitle: action.title,
      }
    case SET_BOOK_FROM_SEARCH:
      return {
        ...state,
        booksListFromSearch: action.bookList,
      }
    case CLEAR_BOOKS_LIST_FROM_SEARCH:
      return {
        ...state,
        booksListFromSearch: [],
      }
    case SET_SORTING_RESULTS:

      return {
        ...state,
        sortingResults: action.sortingResults,
      }
      case SET_FOCUS_ON_SEARCH:
      return {
        ...state,
        inFocus: action.focus,
      }
    default :
      return state
  }
}

export const setBookTitle = (title) => ({type:SET_BOOK_TITLE, title});
export const setBooksListFromSearch = (bookList) => ({type:SET_BOOK_FROM_SEARCH, bookList});
export const clearBooksListFromSearch = () => ({type:CLEAR_BOOKS_LIST_FROM_SEARCH});
export const setSortingResults = (sortingResults) => ({type: SET_SORTING_RESULTS, sortingResults})
export const searchInFocus = (focus) => ({type: SET_FOCUS_ON_SEARCH, focus})

export const getBooksFromSearch = (bookTitle,sortingResults,genre) => {
  return (dispatch) => {
    searchAPI.getBooks(bookTitle,sortingResults,genre).then(response => {
      return dispatch(setBooksListFromSearch(response.data.data))
    })
  }
}

export default SearchReducer;