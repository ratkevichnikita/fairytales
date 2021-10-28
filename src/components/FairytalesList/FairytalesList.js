//global dependencies
import React, {useContext} from 'react';
import {Context} from "../../utils/Context";
import {CSSTransition, TransitionGroup} from "react-transition-group";

//components
import FairytalesItem from "./FairytalesItem/FairytalesItem";

//styles
import './FairytalesList.css';

const FairytalesList = (props) => {

  let publishedBook = props.books.filter(item => item.published === true);
  let favoritesBooks = props.favoritesList;

  const {buyBookModalOpened,setBuyBookModalOpened} = useContext(Context)

  // записать id книг которые выбрал пользователь
  let handleSetFavorites = (event,id) => {
    event.stopPropagation()
    if(event.target.dataset.id === String(id)) {
      props.setFavoritesBooks(id)
      event.target.closest('div').classList.toggle('active')
    }
  }

  // вызвать модалку для кники, которую пользователь хочет купить
  let handleOpenModalForBuyBook = (bookId) => {
    props.setIdOfCurrentBookForBuy(bookId)
    setBuyBookModalOpened(!buyBookModalOpened)
  }

  let fairytalesItem =  <TransitionGroup  component={"ul"} className={props.books.length <= 3 ? 'book-list books-booksWidth' : 'book-list' }> { publishedBook
    .filter(item => props.showFreeBooks ? item.price === null : item)
    .filter(item => {
      if (props.sortByTextAndAudio === 'Show only with text') {
        return (!item.bookSound || !item.bookSound.regions)
      } else if (props.sortByTextAndAudio === 'Show only with audio') {
        return item.bookSound?.regions
      } else {
        return item
      }
    })
    .map(item => {
      // let y = props.touchedBooks.filter(elem => elem.id === item.id).map(elem => elem.pageNumber);

      let hasProgress = props.touchedBooks.filter(el => el.id === item.id).map(el => el.progress).join('');
      let currentfavoriteBook;
      if(favoritesBooks.length > 0) {
        currentfavoriteBook = favoritesBooks.find(itm => +itm === +item.id)
      }

      return (
        <CSSTransition
          key={item.id}
          timeout={500}
          classNames="opacity"
        >
            <FairytalesItem
              price={item.price}
              id={item.id}
              item={item}
              title={item.title}
              image={item.image}
              handleSetFavorites={handleSetFavorites}
              setTouchedBooks={props.setTouchedBooks}
              handleOpenModalForBuyBook={handleOpenModalForBuyBook}
              currentfavoriteBook={currentfavoriteBook}
              hasProgress={hasProgress}
            />
        </CSSTransition>
      )
    }) } </TransitionGroup>
  return (
      <>
        {
          (props.books.length === 0  || fairytalesItem.props.children[1].length === 0) && !props.isFetchingToggle
            ? <div style={{marginTop: 50,color:'#fff'}} >Unfortunately no results were found</div>
            : fairytalesItem
        }
      </>
  );

};

export default FairytalesList;