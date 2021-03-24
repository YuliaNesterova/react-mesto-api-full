import React from "react";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);

    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__delete-button' : 'element__delete-button element__delete-button_hidden'}`
    );

    const cardLikeButtonClassName = `${isLiked ? 'element__like-button element__like-button_clicked' : 'element__like-button'}`;


    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onDelete(props.card);
    }

    return(
        <li className="element">
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick}/>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="element__description">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}