const baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-3/';
const token = '601ed199-89d3-4904-a997-8272583014cc--';

export function loadUser() {}

export function updateUser(user) {}

export function updateUserAvatar() {}

export function loadCards() {
    return fetch(`${baseUrl}cards`, {
        headers: {
            Authorization: token
        }
    })
    .then ((response) => {
        if (response.ok) {
            return response.json()
        } else {
            return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
        }
    })

    .then((cards) => {
        return cards.map( card => ({
            name: card.name,
            link: card.link
        }));
    });
}

export function addCard(card) {}

export function likeCard(cardId) {}

export function unlikeCard(cardId) {}

export function deleteCard(cardId) {}

