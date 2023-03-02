import React from "react";

function CardReact({link}) {
    return(
<div className="element">
    <img src={link} alt="картинка из интернета" className="element__foto"/>
    <button aria-label="удалить" type="button" className="element__btn-delete"></button>
    <div className="element__info">
        <h2 className="element__text"></h2>
        <div className="element__like-block">
            <button aria-label="лайк" type="button" className="element__like-btn"></button>
            <p className="element__like-sum"></p>
        </div>
    </div>
</div>
    );
}

export default CardReact;