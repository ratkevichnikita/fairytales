//global dependencies
import React, {useContext, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Context} from "../../utils/Context";

// images
import heart from '../../images/icons/heart.svg';

//styles
import './styles-favorites.css';


const Favorites = (props) => {

  const [favoritesBooksCount, setFavoritesBooksCount] = useState([])

  const {modalOpened,setModalOpened} = useContext(Context)

  const handleModal = () => {
    setModalOpened(!modalOpened);
  }

  useEffect(() => {
    setFavoritesBooksCount(props.favoritesList.length)
  }, [props.favoritesList.length])

  return (
    <>
      <div onClick={() => handleModal()} className={"favorites"}>
        <img src={heart} alt="decor"/>
        {
          favoritesBooksCount > 0 && (
            <span>{favoritesBooksCount}</span>
          )
        }
      </div>
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    favoritesList: state.fairytalesList.favoritesList
  }
}

export default connect(mapStateToProps, {})(Favorites);