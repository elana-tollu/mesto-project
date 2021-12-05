import './index.css'; // двойные кавычки импользуются только в .html
import { setUserId } from '../components/profile.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { enableValidation } from '../components/validate.js';
import { Api } from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';

const baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-3/';
const token = '601ed199-89d3-4904-a997-8272583014cc';

const api = new Api(baseUrl, token);
const buttonEditProfile = document.querySelector('.button-edit_profile');  // Найти кнопку с карандашом
const buttonEditAvatar = document.querySelector('.button-edit_avatar');
const buttonAdd = document.querySelector('.button-add');  // Найти кнопку с +
const popupImage = new PopupWithImage('.popup_image');
const cardsSection = new Section(
    { renderer: renderCard },
    '.elements__list'
);

function initComponents() {

    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__form-field',
        errorClass: 'popup__input-error_active',
        inputErrorClass: 'popup__form-field_type_error',
        submitButtonSelector: '.popup__button-save',
    });

    popupImage.setEventListeners();

    const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', console.log);
    popupEditAvatar.setEventListeners();
    buttonEditAvatar.addEventListener('click', () => popupEditAvatar.open());

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
        //.catch(alert);
    } );
    popupEditProfile.setEventListeners();
    buttonEditProfile.addEventListener('click', () => popupEditProfile.open());

    const popupAddItem = new PopupWithForm('.popup_add-item', cardData => {
        api.addCard({
            name: cardData['item-name'],
            link: cardData['item-link']
        })
        .then(card => cardsSection.renderItem(card))
        .catch(alert);
    });
    popupAddItem.setEventListeners();
    buttonAdd.addEventListener('click', () => popupAddItem.open());

    Promise.all([userInfo.getUserInfo(), api.loadCards()]) //заменила вызов функций на методы api
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        setUserId(user.id);
        cards.reverse().forEach(card => cardsSection.renderItem(card));
    })
    .catch(alert);
}

function renderCard(cardData) {
    return new Card(cardData, '#card-template',
        () => popupImage.open(cardData.link, cardData.name)).makeElement()
}


initComponents(); // При загрузке скрипта инициализировать кнопки

