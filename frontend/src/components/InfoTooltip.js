import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

export default function InfoTooltip(props) {
    return (
        <section className={props.isOpen? `popup popup_type_info popup_opened` : `popup popup_type_info`}>
            <div className="popup__container popup__container_type_info">
                <button onClick={props.onClose} className="popup__close-button popup__close-button_type_info"></button>
                <img src={props.success ? success : fail} alt="" className="popup__info-image"/>
                <h2 className="popup__title popup__title_type_info">{props.success ? 'Вы успешно зарегистрировались!' :
                    'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </section>
        )
}