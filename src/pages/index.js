import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { objForm } from '../components/constants.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Api } from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';

const baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-3/';
const token = '601ed199-89d3-4904-a997-8272583014cc';

const api = new Api(baseUrl, token);
const buttonEditProfile = document.querySelector('.button-edit_profile'); // Найти кнопку с карандашом
const buttonEditAvatar = document.querySelector('.button-edit_avatar');
const buttonAdd = document.querySelector('.button-add'); // Найти кнопку с +

function initComponents() {
    // запускаем валидацию формы form_edit-profile
    const userFormValidation = new FormValidator(
        objForm,
        '.popup__form_edit-profile'
    );

    userFormValidation.enableValidation();

    // запускаем валидацию формы form_add-item
    const placeFormValidation = new FormValidator(
        objForm,
        '.popup__form_add-item'
    );
    placeFormValidation.enableValidation();

    // запускаем валидацию формы form_edit-avatar
    const linkFormValidation = new FormValidator(
        objForm,
        '.popup__form_edit-avatar'
    );
    linkFormValidation.enableValidation();

    const popupImage = new PopupWithImage('.popup_image');
    popupImage.setEventListeners();

    const userInfo = new UserInfo({
        selectorName: '.profile__name',
        selectorDescription: '.profile__description',
        selectorAvanar: '.profile__avatar',
        loadUser: () => api.loadUser(),
        updateUser: (userData) => api.updateUser(userData),
    });

    const popupEditAvatar = new PopupWithForm(
        '.popup_edit-avatar',
        (formData) => {
            api.updateUserAvatar(formData['avatar-link'])
                .then((user) => userInfo.renderUserInfo(user))
                .catch(alert);
        }
    );
    popupEditAvatar.setEventListeners();
    buttonEditAvatar.addEventListener('click', () => popupEditAvatar.open());

    const cardsSection = new Section(
        {
            renderer: (cardData) =>
                new Card(
                    cardData,
                    '#card-template',
                    () => popupImage.open(cardData.link, cardData.name),
                    () => userInfo.getUserId(),
                    (cardId) => api.likeCard(cardId),
                    (cardId) => api.unlikeCard(cardId),
                    (cardId) => api.deleteCard(cardId)
                ).makeElement(),
        },
        '.elements__list'
    );

    const popupEditProfile = new PopupWithForm(
        '.popup_edit-profile',
        (formData) => {
            userInfo
                .setUserInfo({
                    name: formData['user-name'],
                    about: formData['user-description'],
                })
                .catch(alert);
        }
    );
    popupEditProfile.setEventListeners();
    buttonEditProfile.addEventListener('click', () => {
        popupEditProfile.open();
        popupEditProfile.prefillForm({
            'user-name': userInfo.getName(),
            'user-description': userInfo.getDescription(),
        });
    });

    const popupAddItem = new PopupWithForm('.popup_add-item', (cardData) => {
        api.addCard({
            name: cardData['item-name'],
            link: cardData['item-link'],
        })
            .then((card) => cardsSection.renderItem(card))
            .catch(alert);
    });
    popupAddItem.setEventListeners();
    buttonAdd.addEventListener('click', () => popupAddItem.open());

    Promise.all([userInfo.getUserInfo(), api.loadCards()]) //заменила вызов функций на методы api
        .then(([user, cards]) => {
            userInfo.renderUserInfo(user);
            userInfo.setUserId(user.id);
            cards.reverse().forEach((card) => cardsSection.renderItem(card));
        })
        .catch(alert);
}

initComponents(); // При загрузке скрипта инициализировать кнопки
