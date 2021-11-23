import './index.css';
import {initAddItemForm, initAddItem} from '../components/addItem.js';
import {initEditProfile, initEditProfileForm, showUser, setUserId, initEditAvatar, initEditAvatarForm} from '../components/profile.js';
import { initCards, Card } from '../components/card.js';
import {initModal} from '../components/modal.js';
import {enableValidation} from '../components/validate.js';
import {Api} from '../components/api.js';

const baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-3/';
const token = '601ed199-89d3-4904-a997-8272583014cc';

const api = new Api(baseUrl, token);
const elements = document.querySelector('.elements__list'); // найти контейнер карточек


function initComponents() { //подключение кнопок и мод.окон

    initAddItem();

    initEditProfile();

    initModal();

    initEditProfileForm();

    initEditAvatar();

    initEditAvatarForm();

    initAddItemForm ();

    initCards();

    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__form-field',
        errorClass: 'popup__input-error_active',
        inputErrorClass: 'popup__form-field_type_error',
        submitButtonSelector: '.popup__button-save'
    });
}

function initContent() {
    Promise.all([api.loadUser(), api.loadCards()]) //заменила вызов функций на методы api
    .then(([user, cards]) => {
        showUser(user);
        setUserId(user.id);
        cards.forEach(cardData => {
            const card = new Card(cardData, '#card-template'); //создаем экземпляр класса Card
            elements.prepend(card.makeElement()); //вставляем карточку в ДОМ
        });
    })
    .catch(alert);
}

initComponents(); // При загрузке скрипта инициализировать кнопки
initContent();
