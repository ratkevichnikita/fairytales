import {booksAPI, searchAPI} from "../api/api";
import {setBooks, setFetchingToggle} from "./FairytalesListReducer";

const OPEN_SORT_BY_AUTHORNAME = 'OPEN_SORT_BY_AUTHORNAME';
const GET_AUTHORNAMES = 'GET_AUTHORNAMES';
const CHANGE_AUTHOR_NAME = 'CHANGE_AUTHOR_NAME';
const SET_BOOK_FROM_SORTING = 'SET_BOOK_FROM_SORTING';
const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
const SORT_BY_TEXT_AND_AUDIO = 'SORT_BY_TEXT_AND_AUDIO';
const SET_GENRE_LIST = 'SET_GENRE_LIST';
const SELECTED_GENRE = 'SELECTED_GENRE';
const SELECTED_AUTHORNAME = 'SELECTED_AUTHORNAME';

let initialState = {
  authorNamesIsToggle: false,
  authorNames: [{author: "Choose author"}],
  booksListFromSorting: [],
  resultsFromSearch: '',
  sortByTextAndAudio: 'Show all',
  genreList: [],
  selectedGenre: {genreTitle:'',genreId:''},
  selectedAuthorName: '',
}

const sortingReducers = (state = initialState, action) => {
  switch (action.type) {
    case  OPEN_SORT_BY_AUTHORNAME:
      return {
        ...state,
        authorNamesIsToggle: action.isToggle
      };
    case GET_AUTHORNAMES:
      return {
        ...state,
        authorNames: [{author: "Choose author"}, action.authorNames]
      }
    case CHANGE_AUTHOR_NAME:
      return {
        ...state,
        authorNames: [{author: action.name}, action.names]
      }
    case SET_BOOK_FROM_SORTING:
      return {
        ...state,
        booksListFromSorting: action.bookList,
      }
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        resultsFromSearch: action.bookTitle,
      }
    case SORT_BY_TEXT_AND_AUDIO:
      return {
        ...state,
        sortByTextAndAudio: action.bookType,
      }
    case SET_GENRE_LIST:
      return {
        ...state,
        genreList: action.genreList
      }
    case SELECTED_GENRE:
      return {
        ...state,
        selectedGenre: {genreTitle:action.title, genreId:action.id}
      }
    case SELECTED_AUTHORNAME:
      return {
        ...state,
        selectedAuthorName: action.authorName,
      }
    default:
      return state;
  }
}

export const isOpenSortingAc = (isToggle) => ({type: OPEN_SORT_BY_AUTHORNAME, isToggle});
export const setAuthorNames = (authorNames) => ({type: GET_AUTHORNAMES, authorNames});
export const changeSelectedAuthorName = (name, names) => ({type: CHANGE_AUTHOR_NAME, name, names})
export const setBooksListFromSorting = (bookList) => ({type: SET_BOOK_FROM_SORTING, bookList});
export const setSearchResults = (bookTitle) => ({type: SET_SEARCH_RESULTS, bookTitle});
export const sortingByTextAndAudio = (bookType) => ({type: SORT_BY_TEXT_AND_AUDIO, bookType});
export const setGenreList = (genreList) => ({type: SET_GENRE_LIST, genreList});
export const setSelectedGenre = (title,id) => ({type: SELECTED_GENRE, title,id});
export const setSelectedAuthorName = (authorName) => ({type: SELECTED_AUTHORNAME, authorName});

export const getGenres = () => {
  return (dispatch) => {
    booksAPI.getGenreList().then(response => {
      return dispatch(setGenreList(response.data.data))
    })
  }
}

export const getBooksFromSorting = (title,authorName,genre) => {
  return (dispatch) => {
      dispatch(setFetchingToggle(true))
      searchAPI.getBooks(title, authorName,genre).then(response => {
        if(response.data.data) {
          dispatch(setFetchingToggle(false))
        }
        return dispatch(setBooks(response.data.data))
      })
  }
}

export default sortingReducers;