import Search from "./Search";
import {connect} from "react-redux";
import {clearBooksListFromSearch, getBooksFromSearch, searchInFocus, setBookTitle} from "../../redux/SearchReducer";
import {setSearchResults} from "../../redux/sortingReducers";

let mapStateToProps = (state) => {
  return {
    bookTitle: state.searching.bookTitle,
    booksListFromSearch:state.searching.booksListFromSearch,
    sortingResults: state.searching.sortingResults,
    inFocus: state.searching.inFocus,
    selectedGenreId: state.sorting.selectedGenre.genreId,
    selectedAuthorName: state.sorting.selectedAuthorName
  }
}

export default connect(mapStateToProps, {setBookTitle, getBooksFromSearch,clearBooksListFromSearch,setSearchResults,searchInFocus})(Search)
