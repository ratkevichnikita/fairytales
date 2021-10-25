//global dependencies
import {Link} from "react-router-dom";

//components
import Favorites from "../../common/Favorites/Favorites";
import SearchContainer from "../../common/Search/SearchContainer";
// import Menu from "../../common/Menu/Menu";

//images
import home from './images/home.svg'

//styles
import classes from './style-header.css';

const Header = (props) => {

  return (
    <header className={"header"}>
      <div className={"header-inner"}>
        <div className={"header-logo"}>
          {
            props.startPage
              ? <Link to={location => ({...location, pathname: "/login"})} className={"header-inngang"} > inngang </Link>
              : <div className={"header-home"}><Link to={location => ({...location, pathname: "/"})}> <img src={home} alt="logo"/> </Link></div>
          }
        </div>
        <SearchContainer hideSearch={props.hideSearch}/>
        {
          props.startPage && (
            <Favorites />
          )
        }
        {/*<Menu />*/}
      </div>
    </header>
  )
}

export default Header;