import React, {useEffect} from 'react';
import styles from './Search.module.css';

const Search = (props) => {

  const handleChange = (e) => {
    props.setBookTitle(e.target.value)
    props.setSearchResults(e.target.value)
  };

  useEffect(() => {
    if(props.bookTitle.length >= 3 || (props.bookTitle.length === 0 && props.inFocus)) {
      props.getBooksFromSearch( props.bookTitle, props.selectedAuthorName !== 'Av forfatter' ? props.selectedAuthorName : '', props.selectedGenreId )
    }
    // eslint-disable-next-line
  }, [props.bookTitle])

  return (
    <>
      {!props.hideSearch && (
        <div className={styles.box}>
          <input className={styles.search} type="search" onChange={handleChange} onFocus={() => {props.searchInFocus(true)}} onBlur={() => {props.searchInFocus(false)}} value={props.bookTitle} placeholder="Søk"/>
          <button  type="submit" className={styles.searchBtn}/>
          {props.bookTitle.length >= 3 && (
            <span className={styles.searchResult}>Найдено: {props.booksListFromSearch.length}</span>
          )}
        </div>
      )}
    </>
  )
}

export default Search;