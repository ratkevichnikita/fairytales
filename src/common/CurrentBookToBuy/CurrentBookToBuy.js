//global dependencies
import React from 'react';
import {connect} from "react-redux";

import './styles-currentBookToBuy.css';

const CurrentBookToBuy = (props) => {

  let currentBook = props.books.filter(item => item.id === props.idOfCurrentBookForBuy)

  return (
    <div className={"current-book"}>
      {
        currentBook.map(item => {
          return (
            <div key={item.id} className={item.price && item.price > 0 ? "current-book-item blocked" : "current-book-item"}>
              <div className={"current-book-img"}>
                <img src={item.image} alt={item.title}/>
              </div>
              <div className="current-book-box">
                <p className={"current-book-title"}> {item.title}</p>
                <p className={"current-book-price"}>{item.price} NOK</p>
                <button className={"current-book-button"}>Kjøpe</button>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    books: state.fairytalesList.books,
    idOfCurrentBookForBuy: state.fairytalesList.idOfCurrentBookForBuy
  }
}

export default connect(mapStateToProps, {})(CurrentBookToBuy);