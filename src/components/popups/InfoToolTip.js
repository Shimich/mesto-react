import successUnion from './../../images/success.svg';
import failUnion from './../../images/error.svg';
import React, { useEffect } from 'react';

function InfoToolTip (props) {
    useEffect(() => {

        const closeByEscape = (e) => {
            if ( e.key === 'Escape' ) {
                props.onClose();
            }
        }

        if(props.isOpen){window.addEventListener('keydown', closeByEscape)}
        return(()=>{window.removeEventListener('keydown', closeByEscape)})
    },[props])

    const closeByCLick = (e) => {
        if ( e.target.classList.contains('popup') ) {
            props.onClose();
        }
    }

    return (
        <div className={`popup popup_assignment_${props.name} ${props.isOpen?'popup_is-opened':''}`} onClick={closeByCLick} >
            <div className={`popup__container popup__container_assignment_${props.name}`}>
                <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
                <img className="popup__union" src={`${props.isSucceed ? successUnion : failUnion}`} alt='иконка, сообщающая об (не)успешности авторизации' />
                <h2 className="popup__alert">{`${props.isSucceed ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так! Попробуйте ещё раз.`}`}</h2>
            </div>
        </div>
    )
}

export default InfoToolTip;