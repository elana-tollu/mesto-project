import { createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { setSubmitButtonState } from "./validate.js";

const addItemForm = document.querySelector('#add-item');
const popupAddItem = document.querySelector('.popup_add-item');
const buttonAdd = document.querySelector('.button-add');  // Найти кнопку с +
const addItemButtonCancel = document.querySelector('.popup__button-close_add-item');
const elements = document.querySelector('.elements__list'); // найти контейнер карточек

export function initAddItem() {
    buttonAdd.addEventListener('click', showAddItem);  // Прицепить listener

    addItemButtonCancel.addEventListener('click', cancelAddItem);
}

export function initAddItemForm () { //мод.окно добавления карточки
   addItemForm.addEventListener('submit', saveAddItem);
}

function showAddItem() {
    openPopup(popupAddItem);
    setSubmitButtonState(addItemForm, false);
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
    elements.prepend(createCard(card))
}

