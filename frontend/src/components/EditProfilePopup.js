import React from "react";

import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [nameValidationMessage, setNameValidationMessage] = React.useState('');
    const [descriptionValidationMessage, setDescriptionValidationMessage] = React.useState('');
    const [isNameValid, setIsNameValid] = React.useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = React.useState(true);
    const [isProfileFormValid, setIsProfileFormValid] = React.useState(true);

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        }, [currentUser, props.isOpen]);

    React.useEffect(() => {
        function checkProfileFormValidity() {
            if(isNameValid && isDescriptionValid) {
                setIsProfileFormValid(true);
            } else {
                setIsProfileFormValid(false);
            }
        }
        checkProfileFormValidity();
    }, [name, description, isNameValid, isDescriptionValid]);

    React.useEffect(() => {
        if(!props.isOpen) {
            setNameValidationMessage('');
            setDescriptionValidationMessage('');
            setIsNameValid(true);
            setIsDescriptionValid(true);
        }
    }, [props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
        setIsNameValid(e.target.checkValidity());
        setNameValidationMessage(e.target.validationMessage);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
        setIsDescriptionValid(e.target.checkValidity());
        setDescriptionValidationMessage(e.target.validationMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} save={true} onClose={props.onClose} onSubmit={handleSubmit} onKeyDown={props.onKeyDown}
                       isValid={isProfileFormValid}
                       name={`edit`} title={`Редактировать профиль`} isSaving={props.isSaving}>
            <fieldset className="popup__field">
                <input type="text" name="name" className="popup__input popup__input_type_title"
                       placeholder="Имя"
                       id="name-input"
                       minLength="2"
                       maxLength="40"
                       value={name || ''}
                       onChange={handleNameChange} required/>
                <span className="popup__input-error" id="name-input-error">{nameValidationMessage}</span>
                <input type="text" name="profession" className="popup__input popup__input_type_subtitle"
                       placeholder="Вид деятельности" id="profession-input"
                       minLength="2" maxLength="200"
                       value={description || ''}
                       onChange={handleDescriptionChange} required/>
                <span className="popup__input-error" id="profession-input-error">{descriptionValidationMessage}</span>
            </fieldset>
        </PopupWithForm>
    )
}