import React from "react";
import api from '../utils/Api.js';
import Card from "./Card.js";

function Main(props) {
    const [userName,setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([]);

        React.useEffect(()=> {
        api.getUserInfo()
        .then((res)=> {
            setUserName(res.name)
            setUserDescription(res.about)
            setUserAvatar(res.avatar)
        })
        api.getInitialCards()
        .then((res)=>{
            setCards(res);
        })
    },[])
    
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img src={userAvatar} alt="лицо" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button aria-label="изменить никнейм" type="button" className="profile__popup" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button aria-label="добавить картинку" type="button" className="profile__add" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map(card => (<Card card={card} onClick={props.onCardClick} key={card._id} />))}
            </section>
        </main>
    )
}
export default Main;