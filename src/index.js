import {initialCards} from './components/card.js';
import {initAddItemForm, initAddItem, addItem} from './components/addItem.js';
import {initEditProfile, initEditProfileForm} from './components/editProfile.js';
import { initCards } from './components/card.js';
import {initModal} from './components/modal.js';

function initComponents() { //подключение кнопок и мод.окон

    initAddItem();

    initEditProfile();

    initModal();

    initEditProfileForm();

    initAddItemForm ();

    initCards();
}

function initContent() {
    initialCards.forEach(addItem);
}

initComponents(); // При загрузке скрипта инициализировать кнопки
initContent();
