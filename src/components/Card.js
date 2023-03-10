import React, { useRef, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onClick, onLikeClick, onDeleteClick }) {

    const currentUser = useContext(CurrentUserContext);
    const imgRef = useRef();
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const isOwner = card.owner._id === currentUser._id;

    function handleCardClick(evt) {
        if (evt.target.classList.contains('element__foto'))
            onClick(card)
    }

    function handleLikeClick() {
        onLikeClick(card);
    }
    function handleDeleteButtonClick() {
        onDeleteClick(card);
    }

    return (
        <div className="element" onClick={handleCardClick}>
            <img ref={imgRef} src={card.link} alt={`${card.name} картинка из интернета`} className="element__foto" />
            <button aria-label="удалить" type="button" className={`element__btn-delete ${isOwner ? '' : "element__btn-delete_hide"}`} onClick={handleDeleteButtonClick}></button>
            <div className="element__info">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-block">
                    <button aria-label="лайк" type="button" className={`${isLiked ? 'element__like_active' : ''} element__like-btn `} onClick={handleLikeClick}></button>
                    <p className="element__like-sum">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;