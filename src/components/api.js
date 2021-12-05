export class Api {
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    _request({method, resource, data}) {
        return fetch(`${this.baseUrl}${resource}`, {
            method,
            headers: {
                Authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then ((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
            }
        })
    }

    loadUser() {
        return this._request({  // возвращаем функцию
            method: 'GET',
            resource: 'users/me'
        })
        .then(user => ({ // запрос успешен - присвоить ключам новые значения
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            id: user._id
        }))
    }

    updateUser({name, about}) {
        return this._request({
            method: 'PATCH',
            resource: 'users/me',
            data: {name, about}
        })
        .then(user => ({
            name: user.name,
            about: user.about,
            avatar: user.avatar
        }))
    }

    updateUserAvatar(link) {
        return this._request({
            method: 'PATCH',
            resource: 'users/me/avatar',
            data: {avatar: link}
        });
    }

    loadCards() {
        return this._request({
            method: 'GET',
            resource: 'cards'
        })
        .then((cards) => {
            return cards.map( card => ({
                name: card.name,
                link: card.link,
                likesCount: card.likes.length,
                likes: card.likes,
                id: card._id,
                ownerId: card.owner._id
            }));
        })
    }

    addCard(card) {
        return this._request({
            method: 'POST',
            resource: 'cards',
            data: {
                name: card.name,
                link: card.link
            }
        })
        .then(card => ({
            name: card.name,
            link: card.link,
            likesCount: card.likes.length,
            likes: card.likes,
            id: card._id,
            ownerId: card.owner._id
        }));
    }

    likeCard(cardId) {
        return this._request({
            method: 'PUT',
            resource: `cards/likes/${cardId}`
        })
        .then(card => ({
            name: card.name,
            link: card.link,
            likesCount: card.likes.length,
            likes: card.likes,
            id: card._id,
            ownerId: card.owner._id
        })
        );
    }

    unlikeCard(cardId) {
        return this._request({
            method: 'DELETE',
            resource: `cards/likes/${cardId}`
        })
        .then(card => ({
            name: card.name,
            link: card.link,
            likesCount: card.likes.length,
            likes: card.likes,
            id: card._id,
            ownerId: card.owner._id
        })
        );
    }

    deleteCard(cardId) {
        return this._request({
            method: 'DELETE',
            resource: `cards/${cardId}`
        });
    }
}
