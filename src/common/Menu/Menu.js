import classes from './Menu.module.css';
import {useState} from "react";

const Menu = (props) => {

  const [menuActive, setMenuActive] = useState(false);

  return (
    <div className={props.loginPage ? `${classes.loginMenu} ${classes.parentMenu}` : `${classes.parentMenu}`}>
      <div className={menuActive ? `${classes.active} ${classes.menu}` : `${classes.menu}`}
           onClick={() => setMenuActive(!menuActive)}>

        <span/>
        {menuActive && (
          <ul className={classes.menuList}>
            <li>
              menu item
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Menu;