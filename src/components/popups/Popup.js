import React, { useEffect } from "react";
import { esc } from "../../utils/constants";

function Popup(props){

    const handleClose = (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close') || (evt.key === esc)) {
           props.onClose();
        }
    }
    
    useEffect(() => {
        if(props.isOpen){window.addEventListener('keydown', handleClose)}
        return(()=>{window.removeEventListener('keydown', handleClose)})
    }, [props])
    
    return(
        <div className={`popup popup_${props.name} ${props.isOpen?'popup_is-opened':''}`} onClick={handleClose}>
            <div className={`popup__${props.type}`}>
                <button aria-label="закрыть" type="button" className="popup__close" onClick={props.onClose}></button>
                {props.children}
            </div>
        </div>
    );
}

export default Popup;