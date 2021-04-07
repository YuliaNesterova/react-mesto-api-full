import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [image, setImage] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [descriptionValidationMessage, setDescriptionValidationMessage] = React.useState('');
    const [imageValidationMessage, setImageValidationMessage] = React.useState('');
    const [isDescriptionValid, setIsDescriptionValid] = React.useState(true);
    const [isImageValid, setIsImageValid] = React.useState(true);
    const [isAddPlaceFormValid, setIsAddPlaceFormValid] = React.useState(true);

    function handleImageChange(e) {
        setImage(e.target.value);
        setIsImageValid(e.target.checkValidity());
        setImageValidationMessage(e.target.validationMessage);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
        setIsDescriptionValid(e.target.checkValidity());
        setDescriptionValidationMessage(e.target.validationMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace(
            {
                description, image
            }
        )
    }

    React.useEffect(() => {
        if (!props.isOpen) {
            setImage('');
            setDescription('');
            setImageValidationMessage('');
            setDescriptionValidationMessage('');
            setIsImageValid(true);
            setIsDescriptionValid(true);
        }
    }, [props.isOpen]);

    React.useEffect(() => {
        function checkAddPlaceFormValidity() {
            if(isImageValid && isDescriptionValid) {
                setIsAddPlaceFormValid(true);
            } else {
                setIsAddPlaceFormValid(false);
            }
        }
        checkAddPlaceFormValidity();
    }, [image, description, isImageValid, isDescriptionValid]);

    return (
        <PopupWithForm  isOpen={props.isOpen} save={true} onClose={props.onClose}
                        onSubmit={handleSubmit} isValid={isAddPlaceFormValid}
                        name={`add`} title={`Новое место`} isSaving={props.isSaving}>
            <fieldset className="popup__field">
                <input type="text" name="description"
                       className={`popup__input popup__input_type_description ${isDescriptionValid ? '' : 'popup__input_invalid'}`}
                       id="description-input"
                       placeholder="Название" minLength="1" maxLength="30"
                       value={description || ''}
                       onChange={handleDescriptionChange} required />
                <span className="popup__input-error" id="description-input-error">{descriptionValidationMessage}</span>
                <input type="url" name="image"
                       className={`popup__input popup__input_type_link ${isImageValid ? '' : 'popup__input_invalid'}`}
                       id="place-image-input"
                       placeholder="Ссылка на картинку"
                       value={image || ''}
                       onChange={handleImageChange} required />
                <span className="popup__input-error" id="place-image-input-error">{imageValidationMessage}</span>
            </fieldset>
        </PopupWithForm>
    )
}