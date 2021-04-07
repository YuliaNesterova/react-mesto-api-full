import React from "react";

export default function ImagePopup(props) {

    React.useEffect(() => {
        if(!props.isOpen) return;
        function handleEscClose(e) {
            if(e.key === 'Escape') {
                props.onClose();
            }
        }
        document.addEventListener('keydown', handleEscClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [props.isOpen, props.onClose])

    function handleOverlayClickClose(e) {
        if(e.target === e.currentTarget && props.isOpen) {
            props.onClose();
        }
    }

    return (
        <section className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}
        onMouseDown={handleOverlayClickClose}>
            <figure className="popup__container-image">
                <button onClick={props.onClose}
                    className={`popup__close-button popup__close-button_type_${props.name} popup__close-button_position_side`}></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <figcaption className="popup__caption">{props.card.name}</figcaption>
            </figure>
        </section>
    )
}