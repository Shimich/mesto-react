import React from "react";
import Popup from "./Popup";

function ImagePopup(props) {

    return (
        <Popup 
        type='cadre'
        name='show-foto'
        isOpen={props.isOpen}
        onClose={props.onClose}
        >
           <img src={props.card.link} alt="картинка из интернета" className="popup__foto"/>
                <p className="popup__place-name"></p>
        </Popup>
    );
}
export default ImagePopup;