import React from 'react';
import { useNavigate } from 'react-router-dom';
import Entrance from './Entrance';

function Login(props) {

    const navigate = useNavigate();
    function handleSubmit(password, email) {
        props.onLogin(password, email);
        navigate('/', { replace: true });
    }

    return (
        <Entrance
            submit={handleSubmit}
            task='login'
            title='Вход'
            button='Войти'
        ></Entrance>
    )
}

export default Login;