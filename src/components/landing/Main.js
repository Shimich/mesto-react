import React, {useContext} from "react";
import Card from "../Card.js";
import CurrentUserContext from "./../../contexts/CurrentUserContext"

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img src={currentUser.avatar} alt="лицо" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button aria-label="изменить никнейм" type="button" className="profile__popup" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button aria-label="добавить картинку" type="button" className="profile__add" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map(card => (<Card card={card} onClick={props.onCardClick} key={card._id} onLikeClick={props.onCardLike} onDeleteClick={props.onCardDelete} />))}
            </section>
        </main>
    )
}

export default Main;