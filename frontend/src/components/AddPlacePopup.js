import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [image, setImage] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleImageChange(e) {
        setImage(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
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
        }
    }, [props.isOpen]);

    return (
        <PopupWithForm  isOpen={props.isOpen} save={true} onClose={props.onClose} onSubmit={handleSubmit} name={`add`} title={`Новое место`} isSaving={props.isSaving}>
            <fieldset className="popup__field">
                <input type="text" name="description" className="popup__input popup__input_type_description"
                       id="description-input"
                       placeholder="Название" minLength="1" maxLength="30"
                       value={description || ''}
                       onChange={handleDescriptionChange} required />
                <span className="popup__input-error" id="description-input-error"></span>
                <input type="url" name="image" className="popup__input popup__input_type_link"
                       id="place-image-input"
                       placeholder="Ссылка на картинку"
                       value={image || ''}
                       onChange={handleImageChange} required />
                <span className="popup__input-error" id="place-image-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}