import classes from './Sorting.module.css';
import {useEffect, useRef, useState} from "react";

const Sorting = (props) => {

  const sortRef1 = useRef(null);
  const sortRef2 = useRef(null);
  const sortRef3 = useRef(null);
  // получаем ссылку на input
  const inputRef = useRef(null);
  const [genreListToggle, setGenreListToggle] = useState(false)
  // По клику на пункт в выпадающем списке, менять название на тот что выбран

  let handleClick = (e) => {
    if (e.currentTarget.textContent === 'Av forfatter') {
      e.currentTarget.textContent = ''
    }
    props.setSelectedAuthorName(e.currentTarget.textContent)
  }

  // диспатчим экшен в сторе при изменении чекбокса
  let handleChange = () => {
    props.showOnlyFreeBooks(inputRef.current.checked)
  }

  let changeSortingByTextAndAudio = (e) => {
    props.sortingByTextAndAudio(e.target.innerHTML)
  }

  let handleClickGenres = () => {
    setGenreListToggle(!genreListToggle)
  }

  let handeleGenreClick = (title,id) => {
    props.setSelectedGenre(title,id)
  }

  let authorNames

  if (props.authorNames.length > 1) {
    authorNames = props.authorNames[1].map((item, index) => <li onClick={handleClick} key={index}>{item}</li>)
  }

  // По клику вне сортировки закрывать список с авторами
  useEffect(() => {
    const onClick = e => (sortRef1.current && sortRef1.current.contains(e.target)) || props.isOpenSortingAc(false)
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
    // eslint-disable-next-line
  }, []);

  // По клику вне сортировки закрывать список с авторами
  useEffect(() => {
    const onClick = e => (sortRef2.current && sortRef2.current.contains(e.target)) || props.setSortingToggle(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
    // eslint-disable-next-line
  }, []);

  // По клику вне сортировки закрывать список с авторами
  useEffect(() => {
    const onClick = e => (sortRef3.current && sortRef3.current.contains(e.target)) || setGenreListToggle(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
    // eslint-disable-next-line
  }, []);

  // при начальной загрузке делает запрос за книгами, потом при изменении сортировки делает запросы за книгами
  useEffect(() => {

      props.getBooksFromSorting(props.bookTitle,props.selectedAuthorName,props.selectedGenreId)
    // eslint-disable-next-line
  },[props.selectedAuthorName, props.selectedGenreId])

  return (
    <div  className={classes.list}>
      <ul ref={sortRef1}>
        <li  onClick={() => {
          props.isOpenSortingAc(!props.authorNamesIsToggle)
        }} className={classes.item}>
          <p>
            {
              props.selectedAuthorName !== ''
                ? props.selectedAuthorName
                : 'Av forfatter'
            }
          </p>
          {props.authorNames.length > 1 && props.authorNamesIsToggle && (
            <ul  className={classes.inner}>
              {authorNames}
            </ul>
          )}
        </li>
      </ul>
      <ul ref={sortRef3}>
        <li onClick={() => handleClickGenres()} className={classes.item}>
          <p>
            {
              props.selectedGenre?.genreTitle !== ''
                ? props.selectedGenre.genreTitle
                : 'Sjanger'
            }
          </p>
          {
            props.genreList?.length > 0 && genreListToggle && (
              <ul  className={classes.inner}>
                <li onClick={() => handeleGenreClick('','')}>Sjanger</li>
                {
                  props.genreList.map(item => <li onClick={() => handeleGenreClick(item.title,item.id) } key={item.id}>{item.title}</li>)
                }
              </ul>
            )
          }
        </li>
      </ul>
      <ul ref={sortRef2}>
        <li className={classes.item} onClick={() => props.setSortingToggle(!props.sortingToggle)} >
          <p>{props.sortByTextAndAudio}</p>
          {props.sortingToggle && (
            <ul className={classes.inner}>
              <li onClick={(e) => changeSortingByTextAndAudio(e)}>Show all</li>
              <li onClick={(e) => changeSortingByTextAndAudio(e)}>Show only with text</li>
              <li onClick={(e) => changeSortingByTextAndAudio(e)}>Show only with audio</li>
            </ul>
          )}
        </li>
      </ul>
      <div className={classes.freeBookSort}>
        <p>
          <input onChange={handleChange} ref={inputRef} checked={props.showFreeBooks} id="freeBooks" type="checkbox"/>
          <label htmlFor="freeBooks">Show available</label>
        </p>
      </div>
    </div>
  )
}

export default Sorting;