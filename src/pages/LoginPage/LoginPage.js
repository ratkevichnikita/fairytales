import classes from "./LoginPage.module.css";
import {Link} from "react-router-dom";
import Menu from "../../common/Menu/Menu";
import {useState} from "react";

import bg from "../../images/leaves.svg"

const LoginPage = () => {

  const [loginPage,setLoginPage] = useState(true)

  return (
    <div className={classes.container}>
      <img className={classes.bg} src={bg} alt="background"/>
      <div className={classes.content}>
        <div className="wrapper">
          <header className={classes.header}>
            <div className={classes.inner}>
              <div className={classes.back}>
                <Link to={location => ({...location, pathname: "/"})}/>
              </div>
              <div className={classes.name}>
                <p>Innstillinger</p>
              </div>
              <Menu loginPage={loginPage} />
            </div>
          </header>
          <div className={classes.main}>
            <div className={classes.title}>
              <h1>
                Registrering
              </h1>
              <p>
                Registrer deg og aldri miste din kjøp
              </p>
              <form action="#" className={classes.form}>
                <div className={classes.formInner}>
                  <p>
                    <label htmlFor="" className={classes.label} >ID-en din:</label>
                    <input type="text" readOnly={true} value='14180357@kl' className={classes.inputReadOnly} />
                  </p>
                  <p>
                    <label htmlFor="" className={classes.label}>Din e-post:</label>
                    <input type="text" placeholder='E-post' className={classes.input} />
                  </p>
                  <p>
                    <label htmlFor="" className={classes.label}>Passordet ditt:</label>
                    <input type="text" placeholder='Passord'  className={classes.input} />
                  </p>
                  <div className={classes.buttons}>
                    <button type="button" className={classes.login}>Allerede har en konto</button>
                    <button type="button" className={classes.register}>Registrere</button>
                    <button type="button" className={classes.deleteBooks}>Slette bøker</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;