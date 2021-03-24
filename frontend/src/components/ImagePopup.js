import React from "react";

export default function ImagePopup(props) {

    return (
        <section className={props.card ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
            <figure className="popup__container-image">
                <button onClick={props.onClose}
                    className={`popup__close-button popup__close-button_type_${props.name} popup__close-button_position_side`}></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <figcaption className="popup__caption">{props.card.name}</figcaption>
            </figure>
        </section>
    )
}