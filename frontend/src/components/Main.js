import React from 'react';

import Card from "./Card.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main (props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (

            <main className="content">

                <section className="profile">

                    <div className="profile__info">
                        <button className="profile__image-button" onClick={props.onEditAvatar}>
                            <img src={currentUser.avatar} alt={currentUser.name} className="profile__image" />
                        </button>

                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                    <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
                </section>

                <section className="elements">
                    <ul className="elements__items">
                        {props.cards.map((card) => {
                            return (
                            <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}
                            onDelete={props.onDelete}/>
                            )
                        })}
                    </ul>
                </section>

            </main>
    );
}

export default Main;

