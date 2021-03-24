import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function CardDeletePopup(props) {

    function handleCardDeleteSubmit(evt) {
        evt.preventDefault();

        props.onCardDelete(evt);
    }

    return (
        <PopupWithForm name="delete" save={false} isOpen={props.isOpen} onClose={props.onClose} title="Вы уверены?"
                       onSubmit={handleCardDeleteSubmit} isDeleting={props.isDeleting}/>
    )
}