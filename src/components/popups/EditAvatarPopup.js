import PopupWithForm from "./PopupWithForm";
import React, { useRef } from "react";

function EditAvatarPopup(props) {
    const linkRef = useRef()

    function clear(){
        linkRef.current.value = '';
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar(linkRef.current.value, clear)
            }

    // useEffect(() => {
    //     linkRef.current.value = '';
    // }, [props.isOpen]);//isOpen меняется и при закрытии

    return (
        <PopupWithForm
            name='set-avatar'
            title='Обновить Аватар'
            nameButton='Сохранить'
            form='avatar'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__input-container">
                <input type="url" className="popup__input" name="avatarLink" id="avatarLink" placeholder="Ссылка на аватар"
                    required ref={linkRef} />
                <span className="popup__input-error avatarLink-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;