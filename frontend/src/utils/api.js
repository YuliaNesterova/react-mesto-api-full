class Api {
    constructor({baseUrl, authorization, contentType}) {
        this._baseUrl = baseUrl;
        this._authorization = authorization;
        this._contentType = contentType;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(console.log(`Ошибка ${res.status}`));
        }
        return res.json();
    }

    getInitialCards(token) {
           return fetch(`${this._baseUrl}/cards`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
               .then((res) => this._getResponseData(res));
        }

    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((res) => this._getResponseData(res));
    }

    changeUserInfo(object, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: object.name,
                about: object.about
            })
        })
            .then((res) => this._getResponseData(res));
    }

    addNewCard(object, token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: object.description,
                link: object.image
            })
        })
            .then((res) => this._getResponseData(res));
    }

    deleteCard(id, token) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': this._contentType
            },
        })
            .then((res) => this._getResponseData(res));
    }

    getNewUserPic(object, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                avatar: object.avatar
            })
        })
            .then((res) => this._getResponseData(res));
    }

    changeLikeCardStatus(id, isLiked, token) {
        if(isLiked) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': this._contentType
                }
            })
                .then((res) => this._getResponseData(res));
        } else {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': this._contentType
                }
            })
                .then((res) => this._getResponseData(res));
        }
    }
    }

    const api = new Api({baseUrl: 'http://localhost:3000', contentType: 'application/json'})

export default api;