import { openPopup, closePopup } from "./modal.js";
import { Card } from "../components/card.js";
import { setSubmitButtonState } from "./validate.js";
import { addCard } from "./api.js";

const addItemForm = document.querySelector("#add-item");
export const popupAddItem = document.querySelector(".popup_add-item");
const buttonAdd = document.querySelector(".button-add"); // Найти кнопку с +
const addItemButtonCancel = document.querySelector(
    ".popup__button-close_add-item"
);
const submitButton = addItemForm.querySelector(".popup__button-save_add-item");
const elements = document.querySelector(".elements__list"); // найти контейнер карточек

export function initAddItem() {
    buttonAdd.addEventListener("click", showAddItem); // Прицепить listener

    addItemButtonCancel.addEventListener("click", cancelAddItem);
}

export function initAddItemForm() {
    //мод.окно добавления карточки
    addItemForm.addEventListener("submit", saveAddItem);
}

function showAddItem() {
    openPopup(popupAddItem);
    setSubmitButtonState(addItemForm, false, {
        submitButtonSelector: ".popup__button-save",
    });
}

function saveAddItem(submitEvent) {
    submitEvent.preventDefault(); // Не отправлять форму на сервер и не перезагружать страницу
    submitButton.textContent = "Сохранение...";
    const itemForm = submitEvent.target;
    const card = {
        name: itemForm.elements["item-name"].value,
        link: itemForm.elements["item-link"].value,
    };
    addCard(card)
        .then((newCard) => {
            addItem(newCard);
            itemForm.reset();
            closePopup(popupAddItem);
        }) // запрос успешен - показать новую карточку
        .catch(alert) // неуспешен - вывести сообщение с ошибкой
        .finally(() => {
            submitButton.textContent = "Сохранить";
        }); // в любом случае - закрыть попап
}

function cancelAddItem() {
    closePopup(popupAddItem);
}

export function addItem(cardData) {
    // добавление карточки
    const card = new Card(cardData, "#card-template"); //создаем экземпляр класса Card
    elements.prepend(card.makeElement()); //вставляем карточку в ДОМ
}
