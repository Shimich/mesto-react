import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './landing/Header.js';
import Main from './landing/Main.js';
import Footer from './landing/Footer.js';
import ImagePopup from './popups/ImagePopup.js';
import EditProfilePopup from './popups/EditProfilePopup.js';
import EditAvatarPopup from './popups/EditAvatarPopup.js';
import AddPopup from './popups/AddPopup.js';
import CurrentUserContext from "../contexts/CurrentUserContext";
import Register from './userInput/Register';
import Login from './userInput/Login';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './popups/InfoToolTip';
import api from '../utils/Api.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }//открытие попапа с именем//

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }//попап с добавлением места

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }// попап аватара

    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
    const handleCardClick = (card) => {// должна принимать название и ссылку
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }// попап картинки

    const [isInfoToolTipPopupOpen, setInfoToolTipPopupState] = useState(false);
    const [isSignUpSucceed, setSignUpSuccessState] = useState(true);
    const handleSignUp = (password, email) => {
        console.log('регистрация ');
        api.signup(password, email)
            .then((data) => {
                console.log(data,)
                setSignUpSuccessState(true);
                setInfoToolTipPopupState(true)
            })
            .catch((err) => {
                console.log(err);
                setSignUpSuccessState(false);
                setInfoToolTipPopupState(true)
            })
    }// попап авторизации 
    const [currentUser, setCurrentUser] = useState({});
    const [currentUserEmail, setCurrentUserEmail] = useState('example@yandex.com');
    const [isLoggedIn, setLogInState] = useState(true);
    const navigate = useNavigate();
    const handleSignIn = (password, email) => {
        api.signin(password, email)
            .then((data) => {
                localStorage.setItem('jwt', data.token);
                setLogInState(true);
                setCurrentUserEmail(email);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setSignUpSuccessState(false);
                setInfoToolTipPopupState(true)
            })
    }
    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            api.checkToken()
                .then((res) => {
                    const data = res.data;
                    setCurrentUserEmail(data.email);
                    setLogInState(true);
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err);
                    setCurrentUser({ _id: ` ` });
                    setCurrentUserEmail(' ');
                    setLogInState(false)
                })
        }
    }, [])

    const handleLogOut = () => {
        localStorage.removeItem('jwt');
        setCurrentUser({ _id: '' });
        setCurrentUserEmail('');
        setLogInState(false);
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({ name: '', link: '' });
        setInfoToolTipPopupState(false);
    }

    const handleUpdateUser = (name, description) => {
        api.patchUserInfo(name, description)
            .then(res => setCurrentUser(res))
            .then(closeAllPopups)
            .catch(() => console.log('handleUpdateUser'))
    }

    const handleUpdateAvatar = (link, clear) => {
        api.patchAvatarInfo(link)
            .then(setCurrentUser)
            .then(closeAllPopups)
            .then(clear)
            .catch(() => console.log('handleUpdateAvatar'))
    }

    const [cards, setCards] = useState([]);
    const handleAddCard = (name, link, clear) => {
        api.postCard(link, name)
            .then(newCard => setCards([newCard, ...cards]))
            .then(closeAllPopups)
            .then(clear)
            .catch(() => console.log('handleAddCard'))
    }

    useEffect(() => {
        api.getUserInfo()
            .then(setCurrentUser)
            .catch(() => console.log('getUserInfo'))
    }, [isLoggedIn])

    useEffect(() => {
        api.getInitialCards()
            .then(setCards)
            .catch(() => console.log('getInitialCards'));
    }, [])

    const deleteCard = useCallback((card) => {
        if (card.owner._id === currentUser._id) {
            api.deleteCard(card._id)
                .then(() => {
                    setCards((cards) => cards.filter((curCard) => curCard._id !== card._id));
                })
                .catch(() => console.log('deleteCard'))
        }
    }, [currentUser._id])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            api.like(card._id).then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
                .catch(() => console.log('like'));
        }
        else {
            api.unlike(card._id)
                .then((newCard) => {
                    setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(() => console.log('unlike'));
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='bodyscreen'>
                <div className='root'>

                    <Routes>

                        <Route path="/sign-up" element={
                            <>
                                <Header path={"/sign-up"} />
                                <Register onSignUp={handleSignUp} />
                            </>
                        } />

                        <Route path="/sign-in" element={
                            <>
                                <Header path={"/sign-in"} />
                                <Login onLogin={handleSignIn} />
                            </>
                        } />

                        <Route path="/" element={
                            <ProtectedRoute loggedIn={isLoggedIn}>
                                <>
                                    <Header path={"/"} email={currentUserEmail} onLogOut={handleLogOut} />
                                    <Main
                                        onCardClick={handleCardClick}
                                        onEditProfile={handleEditProfileClick}
                                        onEditAvatar={handleEditAvatarClick}
                                        onAddPlace={handleAddPlaceClick}
                                        cards={cards}
                                        onCardLike={handleCardLike}
                                        onCardDelete={deleteCard}
                                    />
                                    <Footer />
                                </>
                            </ProtectedRoute>
                        } />

                    </Routes>

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser} />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar} />

                    <AddPopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddCard={handleAddCard} />

                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}
                    />

                    <InfoToolTip
                        isSucceed={isSignUpSucceed}
                        name='info-tool-tip'
                        isOpen={isInfoToolTipPopupOpen}
                        onClose={closeAllPopups}
                    />
                </div>
            </div >
        </CurrentUserContext.Provider>

    );
}

export default App;
