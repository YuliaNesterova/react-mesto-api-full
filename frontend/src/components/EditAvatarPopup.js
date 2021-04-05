import React from "react";

import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const [avatar, setAvatar] = React.useState('');
    const [isAvatarInputValid, setIsAvatarInputValid] = React.useState(true);
    const [avatarValidationMessage, setAvatarValidationMessage] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatar
        });
    }

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
        setIsAvatarInputValid(e.target.checkValidity());
        setAvatarValidationMessage(e.target.validationMessage);
    }

    function handleEditAvatarClose() {
        props.onClose();
        setAvatarValidationMessage('');
        setIsAvatarInputValid(true);
    }

    React.useEffect(() => {
        if (!props.isOpen) {
            setAvatar('');
        }
    }, [props.isOpen]);

    return (
        <PopupWithForm isOpen={props.isOpen} save={true} onClose={handleEditAvatarClose} onOpen={isAvatarInputValid}
                       name={`edit-pic`} title={`Обновить аватар`} isSaving={props.isSaving}
                       onSubmit={handleSubmit} isValid={isAvatarInputValid}>
            <fieldset className="popup__field">

                <input type="url" name="user_pic"
                       className={`popup__input popup__input_type_link ${isAvatarInputValid ? '' : 'popup__input_invalid'}`}
                       id="profile-pic-input"
                       placeholder="Ссылка на картинку"
                       value={avatar} onChange={handleAvatarChange} required />
                <span className="popup__input-error" id="profile-pic-input-error">{avatarValidationMessage}</span>
            </fieldset>
        </PopupWithForm>
    )
}