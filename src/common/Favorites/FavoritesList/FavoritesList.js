//global depenencies
import React, {useContext} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Context} from "../../../utils/Context";
import {setFavoritesBooks, setIdOfCurrentBookForBuy} from "../../../redux/FairytalesListReducer";

//styles
import './style-favorites-list.css';
import {CSSTransition, TransitionGroup} from "react-transition-group";

const FavoritesList = (props) => {

  const {buyBookModalOpened, setBuyBookModalOpened} = useContext(Context);

  let x = props.books.filter(item => {
    for (let el of props.favoritesList) {
      if (item.id === el) {
        return item
      }
    }
  }).map(item => item)

  let handleRemove = (event, id) => {
    event.stopPropagation()
    props.setFavoritesBooks(id)
  }

  let handleOpenModalForBuyBook = (bookId) => {
    props.setIdOfCurrentBookForBuy(bookId)
    setBuyBookModalOpened(!buyBookModalOpened)
  }

  return (
    <>
      <h2 className={"fav-title"}>
        Favoritt <span>({x.length})</span>
      </h2>
      {
        props.favoritesList.length > 0
          ? <TransitionGroup component={"ul"} className={"fav-list"}>
            {x.map(item => {
              return (
                <CSSTransition
                  key={item.id}
                  timeout={500}
                  classNames="opacity"
                >
                  <li onClick={() => item.price && item.price > 0 ? handleOpenModalForBuyBook(item.id) : null}
                      className={item.price && item.price > 0 ? 'fav-item blocked' : 'fav-item'}>
                      <span onClick={(event) => {
                        handleRemove(event, item.id)
                      }} className={"fav-remove"}/>
                    <Link className={"fav-link"} to={item.price && item.price > 0 ? '#' : `./book/${item.id}/`}>
                      <div className={"fav-image"}>
                        <img src={item.image} alt={item.title}/>
                      </div>
                    </Link>
                    <p>{item.title}</p>
                  </li>
                </CSSTransition>
              )
            })}
          </TransitionGroup>
          : 'Ни одна книга не выбрана'
      }
    </>

  );
};

let mapStateToProps = (state) => {
  return {
    favoritesList: state.fairytalesList.favoritesList,
    books: state.fairytalesList.books
  }
}

export default connect(mapStateToProps, {setFavoritesBooks, setIdOfCurrentBookForBuy})(FavoritesList);