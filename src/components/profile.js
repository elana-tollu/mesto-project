import { updateUserAvatar } from "./Api.js";

const profileInfo = document.querySelector('.profile__info');
const profileForm = document.forms['edit-profile'];
const popupButtonCancel = document.querySelector('.popup__button-close_profile');
const userName = profileInfo.querySelector('.profile__name');
const userDescription = profileInfo.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__avatar');



function showEditProfile() {
 //   openPopup(popupProfile);
    const currentUserName = profileInfo.querySelector('.profile__name').textContent; // присвоить переменной текстовое содержимое узла ДОМ
    const currentProfileDescription = profileInfo.querySelector('.profile__description').textContent;

}

function cancelEditProfile() {
 //   closePopup(popupProfile);
}

// найти кнопку, по клику открыть попап редактирования аватара
const popupAvatar = document.querySelector('.popup_edit-avatar');
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
