import React from "react";
import Popup from "./Popup";

function PopupWithImage(props) {

    return (
        <Popup 
        type='cadre'
        name='show-foto'
        isOpen={props.isOpen}
        onClose={props.onClose}
        >
           <img src={props.cardLink} alt="картинка из интернета" className="popup__foto"/>
                <p className="popup__place-name"></p>
        </Popup>
    );
}
export default PopupWithImage;