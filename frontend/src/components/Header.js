import React from "react";
import logo from "../images/header__logo.svg";
import { Link, useHistory } from "react-router-dom";

export default function Header(props) {
    const history = useHistory();
    const [isInfoShown, setIsInfoShown] = React.useState(false);

    function handleSignOut() {
        localStorage.removeItem('token');
        props.onSignOut();

        history.push('/sign-in');
    }

    function handleMenuShow() {
        setIsInfoShown(true);

    }

    function handleMenuHide() {
        setIsInfoShown(false);
    }

    return (
        <header className="header">
            <div className="header__main-info">
                <img src={logo} alt="Место" className="header__logo"/>
                <div className={`header__buttons ${props.loggedIn ? `header__display` : `header__display_type_none`}`}>
                    <button className={`header__menu-button ${isInfoShown ? 'header__display_type_none' : `header__display`}`}
                    onClick={handleMenuShow}></button>
                    <button className={`header__close-button ${isInfoShown ? `header__display` : `header__display_type_none`}`}
                    onClick={handleMenuHide}></button>
                </div>
            </div>

            {props.loggedIn ? <div className="header__wrapper">
                <p className={`header__email ${isInfoShown ? `header__display`: ''}`}>{props.userEmail}</p>
                <Link to="/sign-in"
                      className={`header__signout-link ${isInfoShown ? `header__display`: ''}`}
                      onClick={handleSignOut}>Выйти</Link>
            </div> : props.isLoginActive ? <Link to="/sign-up" className="header__link"
                                                 onClick={props.handleLoginInactive}>Регистрация</Link> :
                    <Link to="/sign-in" className="header__link" onClick={props.handleLoginActive}>Войти</Link>}


        </header>
    );
}
