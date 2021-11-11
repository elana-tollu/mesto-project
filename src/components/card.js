import { openPopup, closePopup } from "./modal.js";

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

export function initCards() {
    popupImageButtonClose.addEventListener('click', closePopupImage);
}

export function createCard(item) { // создание карточки
    const card = cardTemplate.querySelector('.element').cloneNode(true);

    const trashButton = card.querySelector('.element__button-trash');
    trashButton.addEventListener('click', deleteItem);

    const image = card.querySelector('.element__image');
    image.src = item.link;
    image.alt = item.name;
    image.addEventListener('click', openImage);

    const heading = card.querySelector('.element__name');
    heading.append(document.createTextNode(item.name));

    const likeButton = card.querySelector('.button-like');
    likeButton.addEventListener('click', toggleLike);

    return card;
}

function toggleLike(clickEvent) { // переключение лайка
    clickEvent.target.classList.toggle('button-like_active');
}


function deleteItem(clickEvent) { // удаление карточки
    const buttonTrash = clickEvent.target;
    const item = buttonTrash.closest('.element');
    item.remove();
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
