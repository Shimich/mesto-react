import React, { useRef } from "react";
import Popup from "./Popup";

function ImagePopup(props) {

    const imgRef = useRef()

    return (
        <Popup
            type='cadre'
            name='show-foto'
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <img src={props.card.link} alt={`Попап картинки ${props.card.name}`} className="popup__foto" ref={imgRef} />
            <p className="popup__place-name">{props.card.name}</p>
        </Popup>
    );
}
export default ImagePopup;