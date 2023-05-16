import React, { useState } from 'react';

function Entrance(props) {

    const [email, setEmail] = useState('');
    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState('');
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.submit(password, email);
    }

    return (
        <form name={`${props.task}-entrance`} className={`entrance entrance_${props.task}`}
            noValidate onSubmit={handleSubmit}>
            <h2 className={`entrance__title`}>{props.title}</h2>
            <div className="entrance__input-container">
                <input id="email" name="email" className="entrance__input"
                    minLength="2" maxLength="40" placeholder="Email" type="email" required
                    onChange={handleEmailChange} />
                <span className="email-error entrance__input-error"></span>
            </div>
            <div className="entrance__input-container">
                <input id="password" name="password" className=" entrance__input"
                    minLength="2" maxLength="200" placeholder="Пароль" type="password" required
                    onChange={handlePasswordChange} />
                <span className="password-error entrance__input-error"></span>
            </div>
            <button name="submit-button" className="entrance__button"
                type="submit">{props.button}</button>
            {props.children}
        </form>
    )
}

export default Entrance;