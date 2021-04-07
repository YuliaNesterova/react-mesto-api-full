import React from "react";

export default function PopupWithForm(props) {

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
        <section className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ''}`}
                 onMouseDown={handleOverlayClickClose}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <button onClick={props.onClose} className={`popup__close-button popup__close-button_type_${props.name}`}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form name={props.name} onSubmit={props.onSubmit} onChange={props.onChange}
                      className={`popup__form popup__form_type_${props.name}`}>
                    {props.children}
                    <button className={`popup__button popup__button_type_${props.name} ${props.isValid ? '' : `popup__button_inactive`}`}
                            type="submit">
                        {props.save ? props.isSaving ? `Сохранение...` : `Сохранить` : props.isDeleting ? `Удаление...` : `Удалить`}
                    </button>

                </form>
            </div>
        </section>
        )
    }
