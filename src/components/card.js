import { openPopup, closePopup } from "./Popup.js";
import { deleteCard, likeCard, unlikeCard } from "./Api.js";
import { getUserId } from "./profile.js";

const popupItem = document.querySelector(".popup_image");
const popupImageButtonClose = document.querySelector(
    ".popup__button-close_image"
);
const cards = document.querySelector(".elements__list"); // контейнер карточек

export class Card {
    constructor(cardData, templateSelector, handleCardClick) {
        this._cardData = cardData;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    makeElement() {
        const cardTemplate = document.querySelector(
            this._templateSelector
        ).content; // нашли шаблон карточки
        const card = cardTemplate.querySelector(".element").cloneNode(true); // создаем новый узел ДОМ
        card.dataset.cardId = this._cardData.id; // запоминаем id карточки в атрибуте

        const trashButton = card.querySelector(".element__button-trash"); //найти кнопку удаления
        if (getUserId() === this._cardData.ownerId) {
            trashButton.addEventListener("click", deleteItem); // прицепить слушатель
        } else {
            trashButton.remove();
        }

        const image = card.querySelector(".element__image"); // найти карточку
        image.src = this._cardData.link; // присвоить значения
        image.alt = this._cardData.name;
        image.addEventListener("click", () => this._handleCardClick()); // прицепить слушатель

        const heading = card.querySelector(".element__name"); // найти заголовок
        heading.textContent = this._cardData.name; // присвоить значение

        const likesCount = card.querySelector(".element__like-count"); // найти счетчик лайков
        likesCount.textContent = this._cardData.likesCount; // присвоить значение

        const likeButton = card.querySelector(".button-like"); // найти кнопку лайка
        if (this._cardData.likes.find((like) => like._id === getUserId())) {
            likeButton.classList.add("button-like_active");
        }

        likeButton.addEventListener("click", () => {
            if (likeButton.classList.contains("button-like_active")) {
                unlikeCard(this._cardData.id)
                    .then((unlikedCard) => {
                        likesCount.textContent = unlikedCard.likesCount;
                        likeButton.classList.remove("button-like_active");
                    })
                    .catch(alert);
            } else {
                likeCard(this._cardData.id)
                    .then((likedCard) => {
                        likesCount.textContent = likedCard.likesCount;
                        likeButton.classList.add("button-like_active");
                    })
                    .catch(alert);
            }
        });

        return card;
    }

}

function deleteItem(clickEvent) {
    // удаление карточки
    const buttonTrash = clickEvent.target;
    const item = buttonTrash.closest(".element");
    const cardId = item.dataset.cardId;
    deleteCard(cardId)
        .then(() => item.remove())
        .catch(alert);
}

function openImage(clickEvent) {
    //открывание мод.окна карточки
    const cardImage = clickEvent.target;
    const popupImage = popupItem.querySelector(".element__image_open");
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    const popupTitle = popupItem.querySelector(".element__name_open");
    popupTitle.textContent = cardImage.alt;
 //   openPopup(popupItem);
}

function closePopupImage() {
    //сворачивание мод.окна карточки
 //   closePopup(popupItem);
}
