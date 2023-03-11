import PopupWithForm from "./PopupWithForm";
import React, { useState, useContext, useEffect } from "react";
import CurrentUserContext from "./../../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser(name, description);
    }

    return (
        <PopupWithForm
            name='set-info'
            title='Редактировать профиль'
            nameButton='Сохранить'
            form='profile'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__input-container">
                <input type="text" className="popup__input" name="name" placeholder="Имя" id="text-name"
                    minLength="2" maxLength="40" required
                    value={name || ''} onChange={handleNameChange} />
                <span className="popup__input-error text-name-error"></span>
            </div>
            <div className="popup__input-container">
                <input type="text" className="popup__input" name="description" placeholder="Профессия"
                    id="text-description" minLength="2" maxLength="400" required
                    value={description || ''} onChange={handleDescriptionChange} />
                <span className="popup__input-error text-description-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup