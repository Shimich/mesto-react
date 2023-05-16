import React from 'react';
import { Link } from 'react-router-dom';
import Entrance from './Entrance';

function Register(props) {

    function handleSubmit(password, email) {
        props.onSignUp(password, email);
    }

    return (
        <Entrance
            submit={handleSubmit}
            task='register'
            title='Регистрация'
            button='Зарегестрироваться'
        >
            <Link to="/sign-in" className='entrance__reg-link'>Уже зарегестрированы? Войти</Link>
        </Entrance>
    )
}

export default Register;