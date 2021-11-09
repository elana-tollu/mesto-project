import { createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { initInput } from "./validate.js";


const popupAddItem = document.querySelector('.popup_add-item');

export function initAddItem() {
    const buttonAdd = document.querySelector('.button-add');  // Найти кнопку с +
    buttonAdd.addEventListener('click', showAddItem);  // Прицепить listener

    const addItemButtonCancel = document.querySelector('.popup__button-close_add-item');
    addItemButtonCancel.addEventListener('click', cancelAddItem);
}

export function initAddItemForm () { //мод.окно добавления карточки
    const addItemForm = document.querySelector('#add-item');
    addItemForm.addEventListener('submit', saveAddItem);

    initInput(addItemForm, 'item-name');

    initInput(addItemForm, 'item-link');
}

function showAddItem() {
    openPopup(popupAddItem);
}

function saveAddItem(submitEvent) {
    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу
    const itemForm = submitEvent.target;
    const card = {
        name: itemForm.elements['item-name'].value,
        link: itemForm.elements['item-link'].value
    }
    addItem(card);
    itemForm.reset();
    closePopup(popupAddItem);
}

function cancelAddItem() {
    closePopup(popupAddItem);
}

export function addItem(card) { // добавление карточки
    const elements = document.querySelector('.elements__list'); // найти контейнер карточек
    elements.prepend(createCard(card))
}

