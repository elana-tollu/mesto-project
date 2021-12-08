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
        this._handleCardDelete = handleCardDelete;
    }

    makeElement() {
        const cardTemplate = document.querySelector(
            this._templateSelector
        ).content; // нашли шаблон карточки
        this._card = cardTemplate.querySelector(".element").cloneNode(true); // создаем новый узел ДОМ

        const trashButton = this._card.querySelector(".element__button-trash"); //найти кнопку удаления
        const likeButton = this._card.querySelector(".button-like"); // найти кнопку лайка

        const image = this._card.querySelector(".element__image"); // найти карточку
        image.src = this._cardData.link; // присвоить значения
        image.alt = this._cardData.name;

        const heading = this._card.querySelector(".element__name"); // найти заголовок
        heading.textContent = this._cardData.name; // присвоить значение

        const likesCount = this._card.querySelector(".element__like-count"); // найти счетчик лайков
        likesCount.textContent = this._cardData.likesCount; // присвоить значение

        this._setEventListeners({image, trashButton, likeButton, likesCount});

        return this._card;
    }

    _setEventListeners({image, trashButton, likeButton, likesCount}) {
        if (this._getCurrentUserId() === this._cardData.ownerId) {
            trashButton.addEventListener("click", () => this._deleteItem()); // прицепить слушатель
        } else {
            trashButton.remove();
        }

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

        image.addEventListener("click", () => this._handleCardClick()); // прицепить слушатель
    }

    _deleteItem() {
        this._handleCardDelete(this._cardData.id)
            .then(() => this._card.remove())
            .catch(alert);
    }
}
