import { openPopup, closePopup } from "./modal.js";
import { updateUser } from "./api.js";

const popupProfile = document.querySelector('.popup_edit-profile');
const profileInfo = document.querySelector('.profile__info');
const profileForm = document.forms['edit-profile'];
const buttonEdit = document.querySelector('.button-edit');  // Найти кнопку с карандашом
const popupButtonCancel = document.querySelector('.popup__button-close');
const editProfileForm = document.querySelector('#edit-profile');  // Найти форму редактирования профиля
const userName = profileInfo.querySelector('.profile__name');
const userDescription = profileInfo.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__avatar');

export function showUser(user) {
    userName.textContent = user.name; // найти элементы профиля и задать текстовое содержимое элементам на странице
    userDescription.textContent = user.about;
    userAvatar.src = user.avatar;
}

export function initEditProfile() {
    buttonEdit.addEventListener('click', showEditProfile);  // Прицепить listener

    popupButtonCancel.addEventListener('click', cancelEditProfile);
}

export function initEditProfileForm () { //мод.окно редактирования профиля
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
    updateUser({
        name: newUserName,
        about: newProfileDescription
    })
    .then(showUser)
    .catch(alert)
    .finally(() => closePopup(popupProfile));
}

function cancelEditProfile() {
    closePopup(popupProfile);
}

