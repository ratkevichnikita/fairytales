import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Start from "../../pages/StartPage/Start";
import FlipPageCustomContainer from "../../pages/FlipPageCustom/FlipPageCustomContainer";
import {connect} from "react-redux";
import {getAuth} from "../../redux/LoginReducer";
import LoginPage from "../../pages/LoginPage/LoginPage";

let mapStateToProps = (state) => {
  return {
    isAuth: state.login.isAuth
  }
}

const AppRouter = (props) => {

  useEffect(() => {
    if(!props.isAuth) {
      props.getAuth()
    }
    // eslint-disable-next-line
  }, [props.isAuth])

  return (
        props.isAuth
        ? <Switch>
            <Route exact path='/' render={() => <Start />} />
            <Route path='/book/:bookId/' render={() => <FlipPageCustomContainer />} />
          <Route path={'/login'} render={() => <LoginPage />} />
            <Redirect to={'/404'} />
          </Switch>
        : 'Вы не авторизированы'
  );
};

export default connect(mapStateToProps, {getAuth})(AppRouter)

