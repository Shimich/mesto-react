import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";

function AddPopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddCard(name, link);
        props.onClose(evt);
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm
            name='set-add'
            title='Новое место'
            nameButton='Создать'
            form='card'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__input-container">
                <input type="text" className="popup__input" name="place" id="text-place" placeholder="Название"
                    minLength="2" maxLength="30" required onChange={handleNameChange} />
                <span className="popup__input-error text-place-error"></span>
            </div>
            <div className="popup__input-container">
                <input type="url" className="popup__input" name="url" id="url" placeholder="Ссылка на картину"
                    required onChange={handleLinkChange} />
                <span className="popup__input-error url-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPopup