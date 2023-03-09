import React from "react";
import Popup from "./Popup";

function PopupWithForm(props) {

    const handleSubmit = (evt) => {
        props.onSubmit(evt);
        props.onClose();
    }

    return (
        <Popup
            type='container'
            name={props.name}
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <form
                name={`${props.form}-form`}
                className="popup__form"
                onSubmit={handleSubmit}
            >
                <h3 className="popup__sense">{props.title}</h3>
                {props.children}
                <button type="submit" className="popup__save">{props.nameButton}</button>
            </form>
        </Popup>
    );
}

export default PopupWithForm;