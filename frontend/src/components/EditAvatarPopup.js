import React from "react";

import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const newAvatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: newAvatarRef.current.value
        });


    }

    React.useEffect(() => {
        if (!props.isOpen) {
            newAvatarRef.current.value = "";
        }
    }, [props.isOpen]);

    return (
        <PopupWithForm isOpen={props.isOpen} save={true} onClose={props.onClose} name={`edit-pic`} title={`Обновить аватар`} isSaving={props.isSaving}
                       onSubmit={handleSubmit}>
            <fieldset className="popup__field">
                <input type="url" name="user_pic" className="popup__input popup__input_type_link"
                       id="profile-pic-input"
                       placeholder="Ссылка на картинку"
                       ref={newAvatarRef} required />
                <span className="popup__input-error" id="profile-pic-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}