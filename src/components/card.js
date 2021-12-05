import { deleteCard, likeCard, unlikeCard } from "./Api.js";

const popupItem = document.querySelector(".popup_image");

export class Card {
    constructor(
        cardData,
        templateSelector,
        handleCardClick,
        getCurrentUserId,
        handleCardLike,
        handleCardUnlike,
        handleCardDelete
    ) {
        this._cardData = cardData;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._getCurrentUserId = getCurrentUserId;
        this._handleCardLike = handleCardLike;
        this._handleCardUnlike = handleCardUnlike;
    }

    makeElement() {
        const cardTemplate = document.querySelector(
            this._templateSelector
        ).content; // нашли шаблон карточки
        const card = cardTemplate.querySelector(".element").cloneNode(true); // создаем новый узел ДОМ
        card.dataset.cardId = this._cardData.id; // запоминаем id карточки в атрибуте

        const trashButton = card.querySelector(".element__button-trash"); //найти кнопку удаления
        if (this._getCurrentUserId() === this._cardData.ownerId) {
            trashButton.addEventListener("click", (clickEvent) => this._deleteItem(clickEvent)); // прицепить слушатель
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
        if (this._cardData.likes.find((like) => like._id === this._getCurrentUserId())) {
            likeButton.classList.add("button-like_active");
        }

        likeButton.addEventListener("click", () => {
            if (likeButton.classList.contains("button-like_active")) {
                this._handleCardUnlike(this._cardData.id)
                    .then((unlikedCard) => {
                        likesCount.textContent = unlikedCard.likesCount;
                        likeButton.classList.remove("button-like_active");
                    })
                    .catch(alert);
            } else {
                this._handleCardLike(this._cardData.id)
                    .then((likedCard) => {
                        likesCount.textContent = likedCard.likesCount;
                        likeButton.classList.add("button-like_active");
                    })
                    .catch(alert);
            }
        });

        return card;
    }

    _deleteItem(clickEvent) {
        // удаление карточки
        const buttonTrash = clickEvent.target;
        const item = buttonTrash.closest(".element");
        const cardId = item.dataset.cardId;
        deleteCard(cardId)
            .then(() => item.remove())
            .catch(alert);
    }
}
