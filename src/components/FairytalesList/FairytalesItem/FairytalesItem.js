import React from 'react';
import {Link} from "react-router-dom";
import headPhone from "../../../images/controls/headphone.svg";

const FairytalesItem = (props) => {
  return (
    <li onClick={() => props.price && props.price > 0 ? props.handleOpenModalForBuyBook(props.id) : null}  key={props.id} className={props.price && props.price > 0 ? 'book-item blocked' : 'book-item'}>
      <div onClick={(event) => props.handleSetFavorites(event,props.id)} className={props.currentfavoriteBook === props.id ? 'book-favorites active' : 'book-favorites'}>
        <svg data-id={props.id} width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
          <path data-id={props.id} d="M14.2604 23.2714C14.1603 23.3309 14.0736 23.3816 14.0017 23.4233C13.9297 23.381 13.8426 23.3293 13.742 23.2689C13.4186 23.0744 12.9552 22.7885 12.3986 22.4246C11.2845 21.6963 9.80153 20.6586 8.32102 19.4188C6.83813 18.1771 5.37223 16.7446 4.28072 15.2292C3.18541 13.7084 2.5 12.1498 2.5 10.6451C2.5 7.24299 5.20714 4.5002 8.52802 4.50022L8.53199 4.50019C10.5641 4.48405 12.4678 5.52439 13.5785 7.26576L13.9976 7.92287L14.4202 7.26799C15.5391 5.53393 17.4392 4.49542 19.4701 4.5002C22.785 4.51696 25.4831 7.25053 25.5 10.6463C25.4996 12.1764 24.8131 13.7473 23.7189 15.2709C22.6278 16.7903 21.1624 18.2193 19.6799 19.4547C18.1998 20.6881 16.7173 21.7165 15.6034 22.4371C15.047 22.7971 14.5838 23.0795 14.2604 23.2714Z" />
        </svg>
      </div>
      <Link className={"book-link"} to={props.price && props.price > 0? '#' : `./book/${props.id}/`} onClick={() => {
        if (props.currentBookId !== undefined) {
          for (let elem of props.currentBookId) {
            if (elem === props.id) {
              return null
            }
          }
        }
        props.setTouchedBooks(props.item)
      }}>
        <div className={'book-image'}>
          <img className={'book-mainImg'} src={props.image} alt={`${props.title}`}/>
          {(props.item.bookSound?.regions && props.item.bookSound?.regions.length > 0) && (
            <div className={'book-audio'}>
              <img  src={headPhone} alt="is listen"/>
            </div>
          )}
        </div>
      </Link>
      <div className={'book-info'}>
        {props.hasProgress > 0 && (
          <div className={'book-progressBar'}>
            {/*{*/}
            {/*  +hasProgress === 100*/}
            {/*    ? <p className={'book-fullyRead'}>Read</p>*/}
            {/*    : <p>Read ( {+hasProgress}% )</p>*/}
            {/*}*/}
            <input className={+props.hasProgress === 100 ? 'book-finished' : ''} readOnly={true}
                   value={+props.hasProgress} min={0} max={100} type="range"/>
          </div>
        )}
        <p className={'book-title'}>{props.title}</p>
        {/*{<p className={'book-price'}>{item.price && item.price > 0 ? `${item.price} NOK` : 'Free'} </p>}*/}
      </div>

    </li>
  );
};

export default FairytalesItem;