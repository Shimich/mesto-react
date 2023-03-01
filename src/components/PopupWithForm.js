import React from "react";
import Popup from "./Popup";

function PopupWithForm(props) {
    
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
                onSubmit={props.onSubmit}
            >
                <h3 className="popup__sense">{props.title}</h3>
                {props.children}
                <button type="submit" className="popup__save">{props.nameButton}</button>
            </form>
        </Popup>
    );
}
export default PopupWithForm;