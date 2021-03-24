import React from "react";

export default function PopupWithForm(props) {

    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ''}`}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <button onClick={props.onClose} className={`popup__close-button popup__close-button_type_${props.name}`}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form name={props.name} onSubmit={props.onSubmit} className={`popup__form popup__form_type_${props.name}`}>
                    {props.children}
                    <button className={`popup__button popup__button_type_${props.name}`} type="submit">
                        {props.save ? props.isSaving ? `Сохранение...` : `Сохранить` : props.isDeleting ? `Удаление...` : `Удалить`}
                    </button>

                </form>
            </div>
        </section>
        )
    }
