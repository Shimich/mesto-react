import { personalInfo } from "./constants";

class Api {
    constructor({ headers, cohortURL }) {
        this._headers = headers;
        this._cohortURL = cohortURL;;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();// возвращаем промис
        }
        else {
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
    } // проверка ответа

    _request(url, options) {
        return fetch(url, options)
            .then(this._getResponse)
    }

    getInitialCards() {
        return this._request(`${this._cohortURL}/cards`, {
            headers: this._headers
        })
    }// получение карточек с сервера

    getUserInfo() {
        return this._request(`${this._cohortURL}/users/me`, {
            headers: this._headers
        })
    }// получение информации о пользователе

    like = (id) => {
        return this._request(`${this._cohortURL}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
    }// полное обновление лайка

    unlike = (id) => {
        return this._request(`${this._cohortURL}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    deleteCard = (id) => {
        return this._request(`${this._cohortURL}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    patchUserInfo = (name, description) => {
        return this._request(`${this._cohortURL}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        })
    }// отправка редактированной информации

    patchAvatarInfo = (link) => {
        return this._request(`${this._cohortURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
    }

    postCard = (link, name) => {
        return this._request(`${this._cohortURL}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })

    }
}

const api = new Api({
    headers: personalInfo.headers,
    cohortURL: personalInfo.cohortURL
});// чтобы не создавать новые

export default api;