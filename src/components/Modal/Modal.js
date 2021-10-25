import React, {useContext} from 'react';

//styles
import './styles-modal.css'

//images
import close from '../../images/icons/modal-close.svg';
import {Context} from "../../utils/Context";

const Modal = ({children,maxWidth,dataName}) => {

  const {setModalOpened,setBuyBookModalOpened} = useContext(Context)

  const handleClose = (event) => {

    if(event.currentTarget.dataset.name === 'buyBook') {

      setBuyBookModalOpened(false)
    }
    if(event.currentTarget.dataset.name === 'favotiresBooks') {
      setModalOpened(false)
    }

  }

  return (
    <div className={"modal"}>
      <div className="modal__container" style={{maxWidth:`${maxWidth}px`}}>
        {children}
        <span data-name={dataName} onClick={(event) => handleClose(event)} className={"modal__close"}>
          <img src={close} alt="close modal"/>
        </span>
      </div>
    </div>
  );
};

export default Modal;