//global dependencies
import React, {useState} from "react";
import {Context} from "../../utils/Context";

//components
import Modal from "../../components/Modal/Modal";
import Header from "../../components/Header/Header";
import FairytalesListContainer from "../../components/FairytalesList/FairytalesListContainer";
import SortingContainer from "../../components/Sorting/SortingContainer";
import FavoritesList from "../../common/Favorites/FavoritesList/FavoritesList";

//styles
import classes from './Start.module.css';

//images
import bgGrass from './../../images/grass-bg.svg';
import CurrentBookToBuy from "../../common/CurrentBookToBuy/CurrentBookToBuy";
import {useSelector} from "react-redux";
import Preloader from "../../common/Preloader/Preloader";


const Start = (props) => {

  const [startPage,setStartPage] = useState(true)

  const [modalOpened, setModalOpened] = useState(false);
  const [buyBookModalOpened, setBuyBookModalOpened] = useState(false);

  const isFetching = useSelector(state => state.fairytalesList.isFetchingToggle)

  return (
    <Context.Provider value={{modalOpened, setModalOpened,setBuyBookModalOpened,buyBookModalOpened}} >
      <div className={classes.container}>
        <div className="wrapper">
          <Header startPage={startPage} />
          <SortingContainer />
          {
            isFetching ? <Preloader /> : <FairytalesListContainer />
          }

        </div>
        <img className={classes.image} src={bgGrass} alt="decor"/>
        {
          modalOpened && (
            <Modal dataName={'favotiresBooks'} maxWidth={530}>
              <FavoritesList />
            </Modal>
          )
        }
        {
          buyBookModalOpened && (
            <Modal dataName={'buyBook'} maxWidth={470}>
                <CurrentBookToBuy />
            </Modal>
          )
        }
      </div>
    </Context.Provider>
  )
}

export default Start;