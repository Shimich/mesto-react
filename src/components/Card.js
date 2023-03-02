import React from "react";

function Card ({ card, onClick }) {
    function handleCardClick () {
        onClick(card)
    }
    
    return(
        <div className="element" onClick={handleCardClick}>
            <img src={card.link} alt="картинка из интернета" className="element__foto"/>
            <button aria-label="удалить" type="button" className="element__btn-delete"></button>
            <div className="element__info">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-block">
                    <button aria-label="лайк" type="button" className="element__like-btn"></button>
                    <p className="element__like-sum">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;