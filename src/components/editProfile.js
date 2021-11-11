import { openPopup, closePopup } from "./modal.js";

const popupProfile = document.querySelector('.popup_edit-profile');
const profileInfo = document.querySelector('.profile__info');
const profileForm = document.forms['edit-profile'];

export function initEditProfile() {
    const buttonEdit = document.querySelector('.button-edit');  // Найти кнопку с карандашом
    buttonEdit.addEventListener('click', showEditProfile);  // Прицепить listener

    const popupButtonCancel = document.querySelector('.popup__button-close');
    popupButtonCancel.addEventListener('click', cancelEditProfile);
}

export function initEditProfileForm () { //мод.окно редактирования профиля
    const editProfileForm = document.querySelector('#edit-profile');  // Найти форму редактирования профиля
    editProfileForm.addEventListener('submit', saveEditProfile);  // Прицепить обработчик на submit
}

function showEditProfile() {
    openPopup(popupProfile);
    const currentUserName = profileInfo.querySelector('.profile__name').textContent;
    const currentProfileDescription = profileInfo.querySelector('.profile__description').textContent;
    profileForm.elements['user-name'].value = currentUserName;
    profileForm.elements['user-description'].value = currentProfileDescription;
}

function saveEditProfile(submitEvent) {
    // profileInfo.reset();
    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу
    const profileForm = submitEvent.target;
    const newUserName = profileForm.elements['user-name'].value;
    const newProfileDescription = profileForm.elements['user-description'].value;// найти инпуты, взять данные из инпутов
    profileInfo.querySelector('.profile__name').textContent = newUserName; // найти элементы профиля и задать текстовое содержимое элементам на странице
    profileInfo.querySelector('.profile__description').textContent = newProfileDescription;

    closePopup(popupProfile);
}

function cancelEditProfile() {
    closePopup(popupProfile);
}

