import React, { useState, useEffect, useCallback } from 'react';
import Header from './landing/Header.js';
import Main from './landing/Main.js';
import Footer from './landing/Footer.js';
// import PopupWithForm from './popups/PopupWithForm.js';
import ImagePopup from './popups/ImagePopup.js';
import EditProfilePopup from './popups/EditProfilePopup.js';
import EditAvatarPopup from './popups/EditAvatarPopup.js';
import AddPopup from './popups/AddPopup.js';
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from '../utils/Api.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({ name: '', link: '' });

    }

    const [currentUser, setCurrentUser] = useState({});
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
    }, [])

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
                .catch(() =>console.log('like'));
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
        <div className='bodyscreen'>
            <div className='root'>
                <CurrentUserContext.Provider value={currentUser}>
                    <Header />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={deleteCard}
                    />
                    <Footer />

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
                </CurrentUserContext.Provider>

            </div>
        </div >
    );
}

export default App;
