import "./index.css";
import {
    initAddItemForm,
    initAddItem,
    popupAddItem,
} from "../components/addItem.js";
import {
    initEditProfile,
    initEditProfileForm,
    showUser,
    setUserId,
    initEditAvatar,
    initEditAvatarForm,
    popupProfile,
    userAvatar,
} from "../components/profile.js";
import { initCards, Card } from "../components/card.js";
import { initModal } from "../components/modal.js";
import { FormValidator } from "../components/validate.js";
import { Api } from "../components/api.js";
import { objForm } from "../components/constants.js";

const baseUrl = "https://mesto.nomoreparties.co/v1/plus-cohort-3/";
const token = "601ed199-89d3-4904-a997-8272583014cc";

const api = new Api(baseUrl, token);
const elements = document.querySelector(".elements__list"); // найти контейнер карточек

function initComponents() {
    //подключение кнопок и мод.окон

    initAddItem();

    initEditProfile();

    initModal();

    initEditProfileForm();

    initEditAvatar();

    initEditAvatarForm();

    initAddItemForm();

    initCards();

    /* enableValidation({
        formSelector: ".popup__form",
        inputSelector: ".popup__form-field",
        errorClass: "popup__input-error_active",
        inputErrorClass: "popup__form-field_type_error",
        submitButtonSelector: ".popup__button-save",
    }); */
}

///запускаем валидацию формы userInfo
const userFormValidation = new FormValidator(objForm, popupProfile);
userFormValidation.enableValidation();

///запускаем валидацию формы place__info
const placeFormValidation = new FormValidator(objForm, popupAddItem);
placeFormValidation.enableValidation();

//запускаем валидацию формы popup__link-info
const linkFormValidation = new FormValidator(objForm, userAvatar);
linkFormValidation.enableValidation();

function initContent() {
    Promise.all([api.loadUser(), api.loadCards()]) //заменила вызов функций на методы api
        .then(([user, cards]) => {
            showUser(user);
            setUserId(user.id);
            cards.forEach((cardData) => {
                const card = new Card(cardData, "#card-template"); //создаем экземпляр класса Card
                elements.append(card.makeElement()); //вставляем карточку в ДОМ
            });
        })
        .catch(alert);
}

initComponents(); // При загрузке скрипта инициализировать кнопки
initContent();
