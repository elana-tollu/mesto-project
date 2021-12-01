import './index.css'; // двойные кавычки импользуются только в .html
import { initAddItemForm, initAddItem } from '../components/addItem.js';
import {
    setUserId,
    initEditAvatar,
    initEditAvatarForm,
} from '../components/profile.js';
import { initCards, Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { enableValidation } from '../components/validate.js';
import { Api } from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';

const baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-3/';
const token = '601ed199-89d3-4904-a997-8272583014cc';

const api = new Api(baseUrl, token);
const elements = document.querySelector('.elements__list'); // найти контейнер карточек

function initComponents() {
    //подключение кнопок и мод.окон

    initAddItem();

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

    const userInfo = new UserInfo (
        {selectorName: '.profile__name',
         selectorDescription: '.profile__description',
         selectorAvanar: '.profile__avatar',
         loadUser: () => api.loadUser(),
         updateUser: (userData) => api.updateUser(userData)
        }
    )

    const popupEditProfile = new PopupWithForm('.popup_edit-profile', formData => {
        api.updateUser({
            name: formData['user-name'],
            about: formData['user-description']
        })
        .then(userData => userInfo.setUserInfo(userData))
    } );
    popupEditProfile.setEventListeners();

    const popupAddItem = new PopupWithForm('.popup_add-item', console.log);
    popupAddItem.setEventListeners();

    Promise.all([userInfo.getUserInfo(), api.loadCards()]) //заменила вызов функций на методы api
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        setUserId(user.id);
        const cardsSection = new Section(
            {
                items: cards,
                renderer: card => new Card(card, '#card-template',
                    () => popupImage.open(card.link, card.name)).makeElement()
            },
            '.elements__list'
        );
        cardsSection.renderItems();
    })
    .catch(alert);
}


initComponents(); // При загрузке скрипта инициализировать кнопки

