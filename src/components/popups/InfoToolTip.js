import React from 'react';
import successMark from './../../images/success.svg';
import failMark from './../../images/error.svg';
import Popup from './Popup';

function InfoToolTip(props) {
    return (
        <Popup
            type='container'
            name={props.name}
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <img className="popup__mark" src={`${props.isSucceed ? successMark : failMark}`} alt='результат авторизации' />
            <h2 className="popup__alert">{`${props.isSucceed ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так! Попробуйте ещё раз.`}`}</h2>
        </Popup>
    )
}

export default InfoToolTip;