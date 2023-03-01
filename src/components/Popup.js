import React from "react";

function Popup(props){

    React.useEffect(() => {
        if(props.isOpen){window.addEventListener('keydown', props.onClose)}
        return(()=>{window.removeEventListener('keydown', props.onClose)})
    }, [props.isOpen])

    return(
        <div className={`popup popup_${props.name} ${props.isOpen?'popup_is-opened':''}`} onClick={props.onClose}>
            <div className={`popup__${props.type}`}>
                <button aria-label="закрыть" type="button" className="popup__close" onClick={props.onClose}></button>
                {props.children}
            </div>
        </div>
    );
}

export default Popup;