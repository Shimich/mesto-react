import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './../../images/logo.svg';
import closeImg from './../../images/close.svg';


function Header({ path, email, onLogOut }) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showUnits, setShowUnits] = useState(false);



    const styleStick = { backgroundColor: 'white', width: '24px', height: '2px' };

    const stiks = (<><div style={styleStick}></div>
        <div style={styleStick}></div>
        <div style={styleStick}></div></>
    )
    const close = <img alt='крестик' src={closeImg} style={{ height: '20px', width: '20px' }} />

    const [sign, setSign] = useState(stiks);

    const toggleUnits = () => {
        setShowUnits(!showUnits);
        if (!showUnits) {// работает асинхроно
            setSign(close)
            return
        }
        setSign(stiks)
    };// нажимаем на палочки и креcтик

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Очистка слушателя события при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);//отслеживаем ширину экрана

    if (path === "/") {
        if (screenWidth < 880) {
            return (
                <><div className={`units ${(showUnits) ? 'units_show' : 'units_hide'}`}>
                    <p className="units__email">{email}</p>
                    <p className="units__logout" onClick={onLogOut}>Выйти</p>
                </div>
                    <header className="header">
                        <img src={logo} alt="Лoго" className="header__logo" />
                        <div
                            style={{ height: '20px', width: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: 'auto 18px', cursor: 'pointer' }}
                            onClick={toggleUnits}
                        >
                            {sign}
                        </div>
                    </header></>
            )
        }
        return (
            <header className="header">
                <img src={logo} alt="Лoго" className="header__logo" />
                <div className='units'>
                    <p className="units__email">{email}</p>
                    <p className="units__logout" onClick={onLogOut}>Выйти</p>
                </div>
            </header>
        )
    }

    return (
        <header className="header">
            <img src={logo} alt="Лoго" className="header__logo" />
            {path === "/sign-up" ? (
                <Link to="/sign-in" className="header__link">Войти</Link>
            ) : (
                <Link to="/sign-up" className="header__link">Регистрация</Link>
            )}
        </header>
    );
}

export default Header;