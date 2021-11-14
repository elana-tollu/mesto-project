import './index.css';
import {initialCards} from '../components/card.js';
import {initAddItemForm, initAddItem, addItem} from '../components/addItem.js';
import {initEditProfile, initEditProfileForm, showUser} from '../components/profile.js';
import { initCards } from '../components/card.js';
import {initModal} from '../components/modal.js';
import {enableValidation} from '../components/validate.js';
import {loadCards, loadUser} from '../components/api.js';

function initComponents() { //подключение кнопок и мод.окон

    initAddItem();

    initEditProfile();

    initModal();

    initEditProfileForm();

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
    initialCards.forEach(addItem);
    loadCards().then(cards => {
        cards.forEach(addItem);
    })
    .catch(alert);

    loadUser().then(showUser)
    .catch(alert);
}

initComponents(); // При загрузке скрипта инициализировать кнопки
initContent();
