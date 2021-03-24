import React from "react";
import logo from "../images/header__logo.svg";
import { Link, useHistory } from "react-router-dom";

export default function Header(props) {
    const history = useHistory();

    function handleSignOut() {
        localStorage.removeItem('token');
        props.onSignOut();

        history.push('/sign-in');
    }
    return (
        <header className="header">
            <img src={logo} alt="Место" className="header__logo"/>
            {props.loggedIn ? <div className="header__wrapper">
                <p className="header__email">{props.userEmail}</p>
                <Link to="/sign-in" className="header__link header__link_type_signout" onClick={handleSignOut}>Выйти</Link>
            </div> : props.isLoginActive ? <Link to="/sign-up" className="header__link"
                                                 onClick={props.handleLoginInactive}>Регистрация</Link> :
                    <Link to="/sign-in" className="header__link" onClick={props.handleLoginActive}>Войти</Link>}
        </header>
    );
}
