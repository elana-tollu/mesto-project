const baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-3/';
const token = '601ed199-89d3-4904-a997-8272583014cc';

function request({method, resource, data}) {
    return fetch(`${baseUrl}${resource}`, {
        method,
        headers: {
            Authorization: token,
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
    });
}

export function loadUser() {
    return request({  // возвращаем функцию
        method: 'GET',
        resource: 'users/me'
    })
    .then(user => ({ // запрос успешен - присвоить ключам новые значения
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        id: user._id
    }));
}

export function updateUser({name, about}) {
    return request({
        method: 'PATCH',
        resource: 'users/me',
        data: {name, about}
    })
    .then(user => ({
        name: user.name,
        about: user.about,
        avatar: user.avatar
    }));
}

export function updateUserAvatar() {

}

export function loadCards() {
    return request({
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
    });
}

export function addCard(card) { // попыталась написать функцию
    return request({
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

export function likeCard(cardId) {
    return request({
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
    }));
}

export function unlikeCard(cardId) {
    return request({
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
    }));
}

export function deleteCard(cardId) {
    return request({
        method: 'DELETE',
        resource: `cards/${cardId}`
    });
}

