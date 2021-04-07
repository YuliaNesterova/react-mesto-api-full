import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

export default function InfoTooltip(props) {

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
    }, [props.isOpen, props.onClose]);

    function handleOverlayClickClose(e) {
        if(e.target === e.currentTarget && props.isOpen) {
            props.onClose();
        }
    }

    return (
        <section className={props.isOpen? `popup popup_type_info popup_opened` : `popup popup_type_info`}
        onMouseDown={handleOverlayClickClose}>
            <div className="popup__container popup__container_type_info">
                <button onClick={props.onClose} className="popup__close-button popup__close-button_type_info"></button>
                <img src={props.success ? success : fail} alt="" className="popup__info-image"/>
                <h2 className="popup__title popup__title_type_info">{props.success ? 'Вы успешно зарегистрировались!' :
                    'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </section>
        )
}