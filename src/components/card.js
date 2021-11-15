import { openPopup, closePopup } from "./modal.js";
import { deleteCard, likeCard, unlikeCard } from "./api.js";
import { getUserId } from "./profile.js";

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];

const popupItem = document.querySelector('.popup_image');
const popupImageButtonClose = document.querySelector('.popup__button-close_image');
const cardTemplate = document.querySelector('#card-template').content;
const cards = document.querySelector('.elements__list'); // контейнер карточек

export function initCards() {
    popupImageButtonClose.addEventListener('click', closePopupImage);
}

export function createCard(item) { // создание карточки
    const card = cardTemplate.querySelector('.element').cloneNode(true); // создаем новый узел ДОМ
    card.dataset.cardId = item.id;

    const trashButton = card.querySelector('.element__button-trash'); //найти кнопку удаления
    if (getUserId() === item.ownerId) {
        trashButton.addEventListener('click', deleteItem);                // прицепить слушатель
    } else {
        trashButton.remove();
    }

    const image = card.querySelector('.element__image'); // найти карточку
    image.src = item.link;                               // присвоить значения
    image.alt = item.name;
    image.addEventListener('click', openImage);          // прицепить слушатель

    const heading = card.querySelector('.element__name');// найти заголовок
    heading.append(document.createTextNode(item.name));  // присвоить значение

    const likeButton = card.querySelector('.button-like');// найти кнопку лайка
    if (item.likes && item.likes.find(like => like._id === getUserId())) {
        likeButton.classList.add('button-like_active');
        likeButton.addEventListener('click', () => {
            unlikeCard(item.id)
            .then(unlikedCard => cards.replaceChild(createCard(unlikedCard), card))
            .catch(alert)
        });
    } else {
        likeButton.addEventListener('click', () => {
            likeCard(item.id)
            .then(likedCard => cards.replaceChild(createCard(likedCard), card))
            .catch(alert)
        });
    }

    const likesCount = card.querySelector('.element__like-count'); // найти счетчик лайков
    likesCount.textContent = item.likesCount;             // присвоить значение
    return card;

   }


function deleteItem(clickEvent) { // удаление карточки
    const buttonTrash = clickEvent.target;
    const item = buttonTrash.closest('.element');
    const cardId = item.dataset.cardId;
    deleteCard(cardId)
    .then(() => item.remove())
    .catch(alert);
}

function openImage (clickEvent) { //открывание мод.окна карточки
    const cardImage = clickEvent.target;
    const popupImage = popupItem.querySelector('.element__image_open');
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    const popupTitle = popupItem.querySelector('.element__name_open');
    popupTitle.textContent = cardImage.alt;
    openPopup(popupItem);
}

function closePopupImage() { //сворачивание мод.окна карточки
    closePopup(popupItem);
}
