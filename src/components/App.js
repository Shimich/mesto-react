import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { esc } from '../utils/constants.js'

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
    const handleEditProfileClick = () => {
        setEditProfilePopupState(true)
    }

    const [isAddPlacePopupOpen, setAddPopupState] = React.useState(false);
    const handleAddPlaceClick = () => {
        setAddPopupState(true);
    }
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
    const handleEditAvatarClick = () => {
        setEditAvatarPopupState(true);
    }

    const [isImagePopupOpen, setImagePopupState] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
    const handleCardClick = (card) => {
        setSelectedCard(card)
        setImagePopupState(true);
    }

    const closeAllPopups = (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close') || (evt.key === esc)) {
            setEditProfilePopupState(false);
            setAddPopupState(false);
            setEditAvatarPopupState(false);
            setImagePopupState(false);
            setSelectedCard({name: '', link: ''});
        }
    }

    return (
        <div className='bodyscreen'>
            <div className='root'>
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />
                <Footer />

                <PopupWithForm
                    name='set-info'
                    title='Редактировать профиль'
                    nameButton='Сохранить'
                    form='profile'
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                >
                    <div className="popup__input-container">
                        <input type="text" className="popup__input" name="name" placeholder="Имя" id="text-name"
                            minLength="2" maxLength="40" required />
                        <span className="popup__input-error text-name-error"></span>
                    </div>
                    <div className="popup__input-container">
                        <input type="text" className="popup__input" name="description" placeholder="Профессия"
                            id="text-description" minLength="2" maxLength="400" required />
                        <span className="popup__input-error text-description-error"></span>
                    </div>
                </PopupWithForm>

                <PopupWithForm
                    name='set-avatar'
                    title='Обновить Аватар'
                    nameButton='Сохранить'
                    form='avatar'
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                >
                    <div className="popup__input-container">
                        <input type="url" className="popup__input" name="avatarLink" id="avatarLink" placeholder="Ссылка на аватар"
                            required />
                        <span className="popup__input-error avatarLink-error"></span>
                    </div>
                </PopupWithForm>

                <PopupWithForm
                    name='set-add'
                    title='Новое место'
                    nameButton='Создать'
                    form='card'
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                >
                    <div className="popup__input-container">
                        <input type="text" className="popup__input" name="place" id="text-place" placeholder="Название"
                            minLength="2" maxLength="30" required />
                        <span className="popup__input-error text-place-error"></span>
                    </div>
                    <div className="popup__input-container">
                        <input type="url" className="popup__input" name="url" id="url" placeholder="Ссылка на картину"
                            required />
                        <span className="popup__input-error url-error"></span>
                    </div>
                </PopupWithForm>

                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                />

            </div>
        </div >
    );
}

export default App;