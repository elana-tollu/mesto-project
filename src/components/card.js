import { openPopup, closePopup } from "./modal.js";
import { deleteCard, likeCard, unlikeCard } from "./api.js";
import { getUserId } from "./profile.js";

const popupItem = document.querySelector('.popup_image');
const popupImageButtonClose = document.querySelector('.popup__button-close_image');
const cards = document.querySelector('.elements__list'); // контейнер карточек

export class Card {
    constructor(cardData, templateSelector) {
        this.cardData = cardData;
        this.templateSelector = templateSelector;
    }

    makeElement() {
        const cardTemplate = document.querySelector(this.templateSelector).content; // нашли шаблон карточки
        const card = cardTemplate.querySelector('.element').cloneNode(true); // создаем новый узел ДОМ
        card.dataset.cardId = this.cardData.id; // запоминаем id карточки в атрибуте

        const trashButton = card.querySelector('.element__button-trash'); //найти кнопку удаления
        if (getUserId() === this.cardData.ownerId) {
            trashButton.addEventListener('click', deleteItem); // прицепить слушатель
        } else {
            trashButton.remove();
        }

        const image = card.querySelector('.element__image'); // найти карточку
        image.src = this.cardData.link;                               // присвоить значения
        image.alt = this.cardData.name;
        image.addEventListener('click', openImage);          // прицепить слушатель

        const heading = card.querySelector('.element__name');// найти заголовок
        heading.textContent = this.cardData.name;  // присвоить значение

        const likesCount = card.querySelector('.element__like-count'); // найти счетчик лайков
        likesCount.textContent = this.cardData.likesCount;             // присвоить значение

        const likeButton = card.querySelector('.button-like');// найти кнопку лайка
        if (this.cardData.likes.find(like => like._id === getUserId())) {
            likeButton.classList.add('button-like_active');
        }

        likeButton.addEventListener('click', () => {
            if (likeButton.classList.contains('button-like_active')) {
                unlikeCard(this.cardData.id)
                .then(unlikedCard => {
                    likesCount.textContent = unlikedCard.likesCount;
                    likeButton.classList.remove('button-like_active');
                })
                .catch(alert)
            } else {
                likeCard(this.cardData.id)
                .then(likedCard => {
                    likesCount.textContent = likedCard.likesCount;
                    likeButton.classList.add('button-like_active');
                })
                .catch(alert)
            }
        });

        return card;
    }
}

export function initCards() {
    popupImageButtonClose.addEventListener('click', closePopupImage);
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

