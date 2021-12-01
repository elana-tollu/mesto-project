import './index.css'; // двойные кавычки импользуются только в .html
import { initAddItemForm, initAddItem } from '../components/addItem.js';
import {
    initEditProfile,
    initEditProfileForm,
    showUser,
    setUserId,
    initEditAvatar,
    initEditAvatarForm,
} from '../components/profile.js';
import { initCards, Card } from '../components/Card.js';
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { enableValidation } from '../components/validate.js';
import { Api } from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';

const baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-3/';
const token = '601ed199-89d3-4904-a997-8272583014cc';

const api = new Api(baseUrl, token);
const elements = document.querySelector('.elements__list'); // найти контейнер карточек

function initComponents() {
    //подключение кнопок и мод.окон

    initAddItem();

    initEditProfile();

    initEditProfileForm();

    initEditAvatar();

    initEditAvatarForm();

    initAddItemForm();

    initCards();

    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__form-field',
        errorClass: 'popup__input-error_active',
        inputErrorClass: 'popup__form-field_type_error',
        submitButtonSelector: '.popup__button-save',
    });


    const popupImage = new PopupWithImage('.popup_image');
    popupImage.setEventListeners();

    const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', console.log);
    popupEditAvatar.setEventListeners();

    const popupEditProfile = new PopupWithForm('.popup_edit-profile', console.log);
    popupEditProfile.setEventListeners();

    const popupAddItem = new PopupWithForm('.popup_add-item', console.log);
    popupAddItem.setEventListeners();

    const userInfo = new UserInfo (
        {selectorName: '.profile__name',
         selectorDescription: '.profile__description',
         loadUser: () => api.loadUser(),
         updateUser: (userData) => api.updateUser(userData)
        }
    )


    Promise.all([userInfo.getUserInfo(), api.loadCards()]) //заменила вызов функций на методы api
    .then(([user, cards]) => {
        showUser(user);
        setUserId(user.id);
        cards.forEach((cardData) => {
            const card = new Card(cardData, '#card-template', () => popupImage.open(cardData.link, cardData.name)); //создаем экземпляр класса Card
            elements.append(card.makeElement()); //вставляем карточку в ДОМ
        });
    })
    .catch(alert);
}


initComponents(); // При загрузке скрипта инициализировать кнопки

