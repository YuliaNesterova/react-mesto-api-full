import errorImage from '../images/error.jpg';

export default function ErrorPopup(props) {

    return (
        <section className={props.isOpen ? `popup popup_type_error popup_opened` : `popup popup_type_error`}>
            <div className="popup__container popup__container_type_error">
                <button onClick={props.onClose} className="popup__close-button popup__close-button_type_error popup__close-button_position_side"></button>
                <img src={errorImage} alt="Ошибка" className="popup__error-image"/>
                    <h2 className="popup__title popup__title_type_error">Что-то пошло не так</h2>
                    <p className="popup__subtitle">Попробуйте еще раз</p>
            </div>
        </section>
    )
}