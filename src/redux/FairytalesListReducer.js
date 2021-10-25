import {booksAPI} from "../api/api";

const SET_BOOKS = 'SET_BOOKS';
const SET_ALL_BOOK_PAGES = 'SET_ALL_BOOK_PAGES';
const SET_LOCALSTORAGE_VIEWED_BOOKS = 'SET_LOCALSTORAGE_VIEWED_BOOKS';
const SET_BOOKS_FROM_SEARCH = 'SET_BOOKS_FROM_SEARCH';
const SET_BOOKS_FROM_SORT = 'SET_BOOKS_FROM_SORT';
const SET_PAGENUMBER_FOR_OPENED_BOOKS = 'SET_PAGENUMBER_FOR_OPENED_BOOKS';
const SET_CURRENT_TIME_FOR_LISTENED_BOOK = 'SET_CURRENT_TIME_FOR_LISTENED_BOOK';
const SET_TOUCHED_BOOK = 'SET_THOUCHED_BOOK';
const SHOW_ONLY_FREE_BOOKS = 'SHOW_ONLY_FREE_BOOKS';
const SET_STATE_OF_AUDIO_FOR_CURRENTBOOK = 'SET_STATE_OF_AUDIO_FOR_CURRENTBOOK';
const SET_TOTALPAGES_FOR_CURRENTBOOK = 'SET_TOTALPAGES_FOR_CURRENTBOOK';
const SET_FAVORITES_BOOK = 'SET_FAVORITES_BOOK';
const SET_ID_OF_CURRENTBOOK_FOR_BUY = 'SET_ID_OF_CURRENTBOOK_FOR_BUY';
const SET_FETCHING_TOGGLE = 'SET_FETCHING_TOGGLE';

let initialState = {
  books: [],
  bookPagesAll: [],
  hideSearch: true,
  idOfCurrentBookForBuy: null,
  showFreeBooks: false,
  isFetchingToggle: false,
  favoritesList: localStorage.getItem('favoritesBooks') ? JSON.parse(localStorage.getItem('favoritesBooks')) : [],
  touchedBooks: localStorage.getItem('viewedBooksNew') ? JSON.parse(localStorage.getItem('viewedBooksNew')) : [],
}

const FairytalesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        books: [...action.books]
      }
    case SET_ALL_BOOK_PAGES:
      return {
        ...state,
        bookPagesAll: [...action.bookPagesAll]
      }
    case SET_LOCALSTORAGE_VIEWED_BOOKS:
      return {
        ...state,
        touchedBooks: [...state.touchedBooks].map(item => {
          if (item.id === action.bookId) {
            return {
              ...item,
              isReading: action.reading,
              isListen: action.listening,
              // currentTime: 0,
              pageNumber: action.pageNum,
              progress: 0,
            }
          }
          return item
        })
      }
    case SET_BOOKS_FROM_SEARCH:
      return {
        ...state,
        books: [...action.booksFromSearch]
      }
    case SET_BOOKS_FROM_SORT:
      return {
        ...state,
        books: [...action.booksFromSort]
      }
    case SET_PAGENUMBER_FOR_OPENED_BOOKS:
      return {
        ...state,
        touchedBooks: [...state.touchedBooks].map(item => {
          if (item.id === action.bookid) {
            return {
              ...item,
              pageNumber: action.pageNumber,
              currentTime: action.time,
              progress: action.progress,
            }
          }
          return item
        })
      }
    case SET_CURRENT_TIME_FOR_LISTENED_BOOK:
      return {
        ...state,
        touchedBooks: [...state.touchedBooks].map(item => {
          if (item.id === action.bookId) {
            return {
              ...item,
              currentTime: action.currentTime,
            }
          }
          return item
        })
      }
    case SET_TOUCHED_BOOK:
      return {
        ...state,
        touchedBooks: [...state.touchedBooks, {...action.bookInfo, isReading: null, isPause:null, totalPages:null, isListen: null}]
      }
    case SET_STATE_OF_AUDIO_FOR_CURRENTBOOK:
      return {
        ...state,
        touchedBooks: [...state.touchedBooks].map(item => {
          if (item.id === action.bookId) {
            return {
              ...item,
              isPause: action.isPause,
            }
          }
          return item
        })
      }
      case SET_TOTALPAGES_FOR_CURRENTBOOK:
      return {
        ...state,
        touchedBooks: [...state.touchedBooks].map(item => {
          if (item.id === action.bookId) {
            return {
              ...item,
              totalPages: action.totalPages,
            }
          }
          return item
        })
      }
    case SHOW_ONLY_FREE_BOOKS:
      return {
        ...state,
        showFreeBooks: action.free,
      }
    case SET_FAVORITES_BOOK:
      const idx = state.favoritesList.findIndex(item => item === action.bookId);
      let newFavoritesList = [];
      if (idx === -1) {
        newFavoritesList = [...state.favoritesList, action.bookId];
      } else {
        newFavoritesList = [...state.favoritesList];
        newFavoritesList.splice(idx, 1);
      }
      return {
        ...state,
        favoritesList: newFavoritesList
      }
    case SET_ID_OF_CURRENTBOOK_FOR_BUY:
      return {
        ...state,
        idOfCurrentBookForBuy: action.bookId
      }
    case SET_FETCHING_TOGGLE:
      return {
        ...state,
        isFetchingToggle: action.fetching
      }
    default:
      return state
  }
}

export const showOnlyFreeBooks = (free) => ({type: SHOW_ONLY_FREE_BOOKS, free});
export const setBooks = (books) => ({type: SET_BOOKS, books});
export const makeChoose = (bookId, reading, listening, pageNum) => ({
  type: SET_LOCALSTORAGE_VIEWED_BOOKS,
  bookId,
  reading,
  listening,
  pageNum,
})
export const setBookPagesAll = (bookPagesAll) => ({type: SET_ALL_BOOK_PAGES, bookPagesAll});
export const setFetchingToggle = (fetching) => ({type: SET_FETCHING_TOGGLE, fetching})

export const setTouchedBooks = (bookInfo) => {
  return (dispatch, getState) => {
    dispatch({type: SET_TOUCHED_BOOK, bookInfo})
    const state = getState();
    localStorage.setItem('viewedBooksNew', JSON.stringify(state.fairytalesList.touchedBooks))
  }
}

export const setStateOfAudio = (bookId,isPause) => {
  return (dispatch, getState) => {
    dispatch({type: SET_STATE_OF_AUDIO_FOR_CURRENTBOOK, bookId, isPause})
    const state = getState();
    localStorage.setItem('viewedBooksNew', JSON.stringify(state.fairytalesList.touchedBooks))
  }
}

export const setTotalPagesForCurrentBook = (bookId,totalPages) => {
  return (dispatch, getState) => {
    dispatch({type: SET_TOTALPAGES_FOR_CURRENTBOOK, bookId, totalPages})
    const state = getState();
    localStorage.setItem('viewedBooksNew', JSON.stringify(state.fairytalesList.touchedBooks))
  }
}

export const setBooksFromSort = (booksFromSort) => {
  return (dispatch, getState) => {
    dispatch({type: SET_BOOKS_FROM_SORT, booksFromSort})
    const state = getState();
    localStorage.setItem('viewedBooksNew', JSON.stringify(state.fairytalesList.touchedBooks))
  }
}

export const setBooksFromSearch = (booksFromSearch) => {
  return (dispatch, getState) => {
    dispatch({type: SET_BOOKS_FROM_SEARCH, booksFromSearch})
    const state = getState();
    localStorage.setItem('viewedBooksNew', JSON.stringify(state.fairytalesList.touchedBooks))
  }
}

export const setMakeChoose = (bookId, reading, listening, pageNum) => {
  return (dispatch, getState) => {
    dispatch(makeChoose(bookId, reading, listening, pageNum))
    const state = getState();
    localStorage.setItem('viewedBooksNew', JSON.stringify(state.fairytalesList.touchedBooks))
  }
}

export const setPageNumbersForOpenedBooks = (bookid, pageNumber, time, progress) => {
  return (dispatch, getState) => {
    dispatch({type: SET_PAGENUMBER_FOR_OPENED_BOOKS, bookid, pageNumber, time, progress})
    const state = getState();
    localStorage.setItem('viewedBooksNew', JSON.stringify(state.fairytalesList.touchedBooks))
  }
}

export const setCurrentTimeForListenedBook = (bookId, currentTime) => {
  return (dispatch, getState) => {
    dispatch({type: SET_CURRENT_TIME_FOR_LISTENED_BOOK, bookId, currentTime})
    const state = getState();
    localStorage.setItem('viewedBooksNew', JSON.stringify(state.fairytalesList.touchedBooks))
  }
}

export const setFavoritesBooks = (bookId) => {
  return (dispatch, getState) => {
    dispatch({type: SET_FAVORITES_BOOK, bookId})
    const state = getState();
    localStorage.setItem('favoritesBooks', JSON.stringify(state.fairytalesList.favoritesList))
  }
}

export const getBooksList = () => {
  return (dispatch) => {
    dispatch(setFetchingToggle(true))
    booksAPI.getBooks().then(response => {
       if(response.data.data) {
         dispatch(setFetchingToggle(false))
       }
      dispatch(setBooks(response.data.data))
    })
  }
}

export const getBookPagesAll = (bookId) => {
  return (dispatch) => {
    dispatch(setFetchingToggle(true))
    booksAPI.getAllBookPages(bookId).then(response => {
      if(response.data.data) {
        dispatch(setFetchingToggle(false))
      }
      dispatch(setBookPagesAll(response.data.data));
    })
  }
}

export const setIdOfCurrentBookForBuy = (bookId) => ({type: SET_ID_OF_CURRENTBOOK_FOR_BUY, bookId});


export default FairytalesListReducer;
