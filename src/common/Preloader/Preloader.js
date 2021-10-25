import React from 'react';
import spinner from '../../images/icons/spiner.svg';

const styles = {
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  left: '50%',
  top: '50%',
}

const Preloader = () => {
  return (
    <img src={spinner} style={styles} alt=""/>
  );
};

export default Preloader;