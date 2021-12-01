import { openPopup, closePopup } from "./Popup.js";
import { updateUser, updateUserAvatar } from "./Api.js";

const popupProfile = document.querySelector('.popup_edit-profile');
const profileInfo = document.querySelector('.profile__info');
const profileForm = document.forms['edit-profile'];
const buttonEdit = document.querySelector('.button-edit_profile');  // Найти кнопку с карандашом
const popupButtonCancel = document.querySelector('.popup__button-close_profile');
const editProfileForm = document.querySelector('#edit-profile');  // Найти форму редактирования профиля
const userName = profileInfo.querySelector('.profile__name');
const userDescription = profileInfo.querySelector('.profile__description');
const saveProfileButton = profileForm.querySelector('.popup__button-save');
const userAvatar = document.querySelector('.profile__avatar');
let _userId;

export function setUserId (userId) {
    _userId = userId;
}

export function getUserId () {
    return _userId;
}

export function showUser(user) {
    userName.textContent = user.name; // найти элементы профиля и задать текстовое содержимое элементам на странице
    userDescription.textContent = user.about;
    userAvatar.src = user.avatar; // задать аватар по .src
}

export function initEditProfile() {
    buttonEdit.addEventListener('click', showEditProfile);  // Прицепить listener
    popupButtonCancel.addEventListener('click', cancelEditProfile);
}

export function initEditProfileForm () { //мод.окно редактирования профиля
    editProfileForm.addEventListener('submit', saveEditProfile);  // Прицепить обработчик на submit
}

function showEditProfile() {
 //   openPopup(popupProfile);
    const currentUserName = profileInfo.querySelector('.profile__name').textContent; // присвоить переменной текстовое содержимое узла ДОМ
    const currentProfileDescription = profileInfo.querySelector('.profile__description').textContent;
    profileForm.elements['user-name'].value = currentUserName;
    profileForm.elements['user-description'].value = currentProfileDescription;
}

function saveEditProfile(submitEvent) {
    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу
    saveProfileButton.textContent = "Сохранение...";
    const profileForm = submitEvent.target;
    const newUserName = profileForm.elements['user-name'].value; // присвоить переменной значение интпута
    const newProfileDescription = profileForm.elements['user-description'].value;// найти инпуты, взять данные из инпутов
    updateUser({ // обновить объект, присвоив ключам новые значения
        name: newUserName,
        about: newProfileDescription
    })
    .then(user => {
        showUser(user);
 //       closePopup(popupProfile);
    }) // запрос успешен - показать нового юзера
    .catch(alert)   // неуспешен - вывести сообщение с ошибкой
    .finally(() => {
        saveProfileButton.textContent = "Сохранить";
    }); // в любом случае - закрыть попап
}

function cancelEditProfile() {
 //   closePopup(popupProfile);
}

// найти кнопку, по клику открыть попап редактирования аватара
const popupAvatar = document.querySelector('.popup_edit-avatar');
const buttonEditAvatar = document.querySelector('.button-edit_avatar');
const buttonCancelAvatar = document.querySelector('.popup__button-close_edit-avatar');
const avatarImage = document.querySelector('.profile__avatar'); // присвоить переменной текстовое содержимое узла ДОМ
const avatarForm = document.forms['edit-avatar'];
const saveAvatarButton = popupAvatar.querySelector('.popup__button-save_edit-avatar');

export function initEditAvatar() {
    buttonEditAvatar.addEventListener('click', showEditAvatar);  // Прицепить listener
    buttonCancelAvatar.addEventListener('click', cancelEditAvatar);
}

function showEditAvatar() {
 //   openPopup(popupAvatar);
    const currentSrc = avatarImage.src; // присвоить переменной текстовое содержимое узла ДОМ
    avatarForm.elements['avatar-link'].value = currentSrc;
}

function cancelEditAvatar() {
 //   closePopup(popupAvatar);
}


export function initEditAvatarForm () {
    avatarForm.addEventListener('submit', saveEditAvatar);
}

function saveEditAvatar(submitEvent) {
    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу
    saveAvatarButton.textContent = "Сохранение...";
    const newSrc = avatarForm.elements['avatar-link'].value; // присвоить переменной значение интпута
    updateUserAvatar(newSrc)
    .then( () => {
        avatarImage.src = newSrc;
 //       closePopup(popupAvatar);
    }) // запрос успешен - показать нового юзера
    .catch(alert)   // неуспешен - вывести сообщение с ошибкой
    .finally(() => saveAvatarButton.textContent = "Сохранить"); // в любом случае - закрыть попап
}
