/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/pages/index.css?");

/***/ }),

/***/ "./src/components/addItem.js":
/*!***********************************!*\
  !*** ./src/components/addItem.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initAddItem\": () => (/* binding */ initAddItem),\n/* harmony export */   \"initAddItemForm\": () => (/* binding */ initAddItemForm),\n/* harmony export */   \"addItem\": () => (/* binding */ addItem)\n/* harmony export */ });\n/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card.js */ \"./src/components/card.js\");\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ \"./src/components/modal.js\");\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validate.js */ \"./src/components/validate.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api.js */ \"./src/components/api.js\");\n\n\n\n\n\nconst addItemForm = document.querySelector('#add-item');\nconst popupAddItem = document.querySelector('.popup_add-item');\nconst buttonAdd = document.querySelector('.button-add');  // Найти кнопку с +\nconst addItemButtonCancel = document.querySelector('.popup__button-close_add-item');\nconst elements = document.querySelector('.elements__list'); // найти контейнер карточек\nconst submitButton = addItemForm.querySelector('.popup__button-save_add-item');\n\nfunction initAddItem() {\n    buttonAdd.addEventListener('click', showAddItem);  // Прицепить listener\n\n    addItemButtonCancel.addEventListener('click', cancelAddItem);\n}\n\nfunction initAddItemForm () { //мод.окно добавления карточки\n   addItemForm.addEventListener('submit', saveAddItem);\n}\n\nfunction showAddItem() {\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_1__.openPopup)(popupAddItem);\n    (0,_validate_js__WEBPACK_IMPORTED_MODULE_2__.setSubmitButtonState)(addItemForm, false, {\n        submitButtonSelector: '.popup__button-save'\n    });\n}\n\nfunction saveAddItem(submitEvent) {\n    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу\n    submitButton.textContent = \"Сохранение...\";\n    const itemForm = submitEvent.target;\n    const card = {\n        name: itemForm.elements['item-name'].value,\n        link: itemForm.elements['item-link'].value\n    }\n    ;(0,_api_js__WEBPACK_IMPORTED_MODULE_3__.addCard)(card)\n    .then(addItem) // запрос успешен - показать новую карточку\n    .catch(alert)   // неуспешен - вывести сообщение с ошибкой\n    .finally(() => {\n        itemForm.reset();\n        (0,_modal_js__WEBPACK_IMPORTED_MODULE_1__.closePopup)(popupAddItem);\n        submitButton.textContent = \"Сохранить\";\n    }); // в любом случае - закрыть попап\n}\n\nfunction cancelAddItem() {\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_1__.closePopup)(popupAddItem);\n}\n\nfunction addItem(card) { // добавление карточки\n    elements.prepend((0,_card_js__WEBPACK_IMPORTED_MODULE_0__.createCard)(card))\n}\n\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/addItem.js?");

/***/ }),

/***/ "./src/components/api.js":
/*!*******************************!*\
  !*** ./src/components/api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadUser\": () => (/* binding */ loadUser),\n/* harmony export */   \"updateUser\": () => (/* binding */ updateUser),\n/* harmony export */   \"updateUserAvatar\": () => (/* binding */ updateUserAvatar),\n/* harmony export */   \"loadCards\": () => (/* binding */ loadCards),\n/* harmony export */   \"addCard\": () => (/* binding */ addCard),\n/* harmony export */   \"likeCard\": () => (/* binding */ likeCard),\n/* harmony export */   \"unlikeCard\": () => (/* binding */ unlikeCard),\n/* harmony export */   \"deleteCard\": () => (/* binding */ deleteCard)\n/* harmony export */ });\nconst baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-3/';\nconst token = '601ed199-89d3-4904-a997-8272583014cc';\n\nfunction request({method, resource, data}) {\n    return fetch(`${baseUrl}${resource}`, {\n        method,\n        headers: {\n            Authorization: token,\n            'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(data)\n    })\n    .then ((response) => {\n        if (response.ok) {\n            return response.json()\n        } else {\n            return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);\n        }\n    });\n}\n\nfunction loadUser() {\n    return request({  // возвращаем функцию\n        method: 'GET',\n        resource: 'users/me'\n    })\n    .then(user => ({ // запрос успешен - присвоить ключам новые значения\n        name: user.name,\n        about: user.about,\n        avatar: user.avatar,\n        id: user._id\n    }));\n}\n\nfunction updateUser({name, about}) {\n    return request({\n        method: 'PATCH',\n        resource: 'users/me',\n        data: {name, about}\n    })\n    .then(user => ({\n        name: user.name,\n        about: user.about,\n        avatar: user.avatar\n    }));\n}\n\nfunction updateUserAvatar(link) {\n    return request({\n        method: 'PATCH',\n        resource: 'users/me/avatar',\n        data: {avatar: link}\n    });\n}\n\nfunction loadCards() {\n    return request({\n        method: 'GET',\n        resource: 'cards'\n    })\n    .then((cards) => {\n        return cards.map( card => ({\n            name: card.name,\n            link: card.link,\n            likesCount: card.likes.length,\n            likes: card.likes,\n            id: card._id,\n            ownerId: card.owner._id\n        }));\n    });\n}\n\nfunction addCard(card) { // попыталась написать функцию\n    return request({\n        method: 'POST',\n        resource: 'cards',\n        data: {\n            name: card.name,\n            link: card.link\n        }\n    })\n    .then(card => ({\n        name: card.name,\n        link: card.link,\n        likesCount: card.likes.length,\n        likes: card.likes,\n        id: card._id,\n        ownerId: card.owner._id\n    }));\n}\n\nfunction likeCard(cardId) {\n    return request({\n        method: 'PUT',\n        resource: `cards/likes/${cardId}`\n    })\n    .then(card => ({\n        name: card.name,\n        link: card.link,\n        likesCount: card.likes.length,\n        likes: card.likes,\n        id: card._id,\n        ownerId: card.owner._id\n    }));\n}\n\nfunction unlikeCard(cardId) {\n    return request({\n        method: 'DELETE',\n        resource: `cards/likes/${cardId}`\n    })\n    .then(card => ({\n        name: card.name,\n        link: card.link,\n        likesCount: card.likes.length,\n        likes: card.likes,\n        id: card._id,\n        ownerId: card.owner._id\n    }));\n}\n\nfunction deleteCard(cardId) {\n    return request({\n        method: 'DELETE',\n        resource: `cards/${cardId}`\n    });\n}\n\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/api.js?");

/***/ }),

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initialCards\": () => (/* binding */ initialCards),\n/* harmony export */   \"initCards\": () => (/* binding */ initCards),\n/* harmony export */   \"createCard\": () => (/* binding */ createCard)\n/* harmony export */ });\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ \"./src/components/modal.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./src/components/api.js\");\n/* harmony import */ var _profile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile.js */ \"./src/components/profile.js\");\n\n\n\n\nconst initialCards = [\n    {\n      name: 'Архыз',\n      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'\n    },\n    {\n      name: 'Челябинская область',\n      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'\n    },\n    {\n      name: 'Иваново',\n      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'\n    },\n    {\n      name: 'Камчатка',\n      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'\n    },\n    {\n      name: 'Холмогорский район',\n      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'\n    },\n    {\n      name: 'Байкал',\n      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'\n    }\n    ];\n\nconst popupItem = document.querySelector('.popup_image');\nconst popupImageButtonClose = document.querySelector('.popup__button-close_image');\nconst cardTemplate = document.querySelector('#card-template').content;\nconst cards = document.querySelector('.elements__list'); // контейнер карточек\n\nfunction initCards() {\n    popupImageButtonClose.addEventListener('click', closePopupImage);\n}\n\nfunction createCard(item) { // создание карточки\n    const card = cardTemplate.querySelector('.element').cloneNode(true); // создаем новый узел ДОМ\n    card.dataset.cardId = item.id;\n\n    const trashButton = card.querySelector('.element__button-trash'); //найти кнопку удаления\n    if ((0,_profile_js__WEBPACK_IMPORTED_MODULE_2__.getUserId)() === item.ownerId) {\n        trashButton.addEventListener('click', deleteItem);                // прицепить слушатель\n    } else {\n        trashButton.remove();\n    }\n\n    const image = card.querySelector('.element__image'); // найти карточку\n    image.src = item.link;                               // присвоить значения\n    image.alt = item.name;\n    image.addEventListener('click', openImage);          // прицепить слушатель\n\n    const heading = card.querySelector('.element__name');// найти заголовок\n    heading.append(document.createTextNode(item.name));  // присвоить значение\n\n    const likeButton = card.querySelector('.button-like');// найти кнопку лайка\n    if (item.likes && item.likes.find(like => like._id === (0,_profile_js__WEBPACK_IMPORTED_MODULE_2__.getUserId)())) {\n        likeButton.classList.add('button-like_active');\n        likeButton.addEventListener('click', () => {\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.unlikeCard)(item.id)\n            .then(unlikedCard => cards.replaceChild(createCard(unlikedCard), card))\n            .catch(alert)\n        });\n    } else {\n        likeButton.addEventListener('click', () => {\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.likeCard)(item.id)\n            .then(likedCard => cards.replaceChild(createCard(likedCard), card))\n            .catch(alert)\n        });\n    }\n\n    const likesCount = card.querySelector('.element__like-count'); // найти счетчик лайков\n    likesCount.textContent = item.likesCount;             // присвоить значение\n    return card;\n\n   }\n\n\nfunction deleteItem(clickEvent) { // удаление карточки\n    const buttonTrash = clickEvent.target;\n    const item = buttonTrash.closest('.element');\n    const cardId = item.dataset.cardId;\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.deleteCard)(cardId)\n    .then(() => item.remove())\n    .catch(alert);\n}\n\nfunction openImage (clickEvent) { //открывание мод.окна карточки\n    const cardImage = clickEvent.target;\n    const popupImage = popupItem.querySelector('.element__image_open');\n    popupImage.src = cardImage.src;\n    popupImage.alt = cardImage.alt;\n    const popupTitle = popupItem.querySelector('.element__name_open');\n    popupTitle.textContent = cardImage.alt;\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openPopup)(popupItem);\n}\n\nfunction closePopupImage() { //сворачивание мод.окна карточки\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closePopup)(popupItem);\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/card.js?");

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initModal\": () => (/* binding */ initModal),\n/* harmony export */   \"openPopup\": () => (/* binding */ openPopup),\n/* harmony export */   \"closePopup\": () => (/* binding */ closePopup)\n/* harmony export */ });\nconst body = document.querySelector('.page');\nconst popupOverlays = document.querySelectorAll('.popup__overlay');\n\nfunction initModal() {\n    popupOverlays.forEach(overlay => overlay.addEventListener('click', closeParentPopup)); // привязать EventListener к каждому элементу коллекции overlay\n}\n\nfunction openPopup(popup) { // открывает мод.окно\n    popup.classList.add('popup_opened');\n    body.addEventListener('keydown', closeWithEsc);\n}\n\nfunction closePopup(popup) { // закрывает мод.окно\n    popup.classList.remove('popup_opened');\n    body.removeEventListener('keydown', closeWithEsc);\n}\n\nfunction closeParentPopup(clickEvent) {\n    const overlay = clickEvent.target;\n    closePopup(overlay.parentElement);\n}\n\nfunction closeWithEsc(event) {\n    if(event.key === 'Escape') {\n        closePopup(document.querySelector('.popup_opened')); // вызвать функцию closePopup, передав ей элемент с классом .popup_opened\n    }\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/modal.js?");

/***/ }),

/***/ "./src/components/profile.js":
/*!***********************************!*\
  !*** ./src/components/profile.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setUserId\": () => (/* binding */ setUserId),\n/* harmony export */   \"getUserId\": () => (/* binding */ getUserId),\n/* harmony export */   \"showUser\": () => (/* binding */ showUser),\n/* harmony export */   \"initEditProfile\": () => (/* binding */ initEditProfile),\n/* harmony export */   \"initEditProfileForm\": () => (/* binding */ initEditProfileForm),\n/* harmony export */   \"initEditAvatar\": () => (/* binding */ initEditAvatar),\n/* harmony export */   \"initEditAvatarForm\": () => (/* binding */ initEditAvatarForm)\n/* harmony export */ });\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ \"./src/components/modal.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./src/components/api.js\");\n\n\n\nconst popupProfile = document.querySelector('.popup_edit-profile');\nconst profileInfo = document.querySelector('.profile__info');\nconst profileForm = document.forms['edit-profile'];\nconst buttonEdit = document.querySelector('.button-edit_profile');  // Найти кнопку с карандашом\nconst popupButtonCancel = document.querySelector('.popup__button-close_profile');\nconst editProfileForm = document.querySelector('#edit-profile');  // Найти форму редактирования профиля\nconst userName = profileInfo.querySelector('.profile__name');\nconst userDescription = profileInfo.querySelector('.profile__description');\nconst saveProfileButton = profileForm.querySelector('.popup__button-save');\nconst userAvatar = document.querySelector('.profile__avatar');\nlet _userId;\n\nfunction setUserId (userId) {\n    _userId = userId;\n}\n\nfunction getUserId () {\n    return _userId;\n}\n\nfunction showUser(user) {\n    userName.textContent = user.name; // найти элементы профиля и задать текстовое содержимое элементам на странице\n    userDescription.textContent = user.about;\n    userAvatar.src = user.avatar; // задать аватар по .src\n}\n\nfunction initEditProfile() {\n    buttonEdit.addEventListener('click', showEditProfile);  // Прицепить listener\n    popupButtonCancel.addEventListener('click', cancelEditProfile);\n}\n\nfunction initEditProfileForm () { //мод.окно редактирования профиля\n    editProfileForm.addEventListener('submit', saveEditProfile);  // Прицепить обработчик на submit\n}\n\nfunction showEditProfile() {\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openPopup)(popupProfile);\n    const currentUserName = profileInfo.querySelector('.profile__name').textContent; // присвоить переменной текстовое содержимое узла ДОМ\n    const currentProfileDescription = profileInfo.querySelector('.profile__description').textContent;\n    profileForm.elements['user-name'].value = currentUserName;\n    profileForm.elements['user-description'].value = currentProfileDescription;\n}\n\nfunction saveEditProfile(submitEvent) {\n    // profileInfo.reset();\n    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу\n    saveProfileButton.textContent = \"Сохранение...\";\n    const profileForm = submitEvent.target;\n    const newUserName = profileForm.elements['user-name'].value; // присвоить переменной значение интпута\n    const newProfileDescription = profileForm.elements['user-description'].value;// найти инпуты, взять данные из инпутов\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.updateUser)({ // обновить объект, присвоив ключам новые значения\n        name: newUserName,\n        about: newProfileDescription\n    })\n    .then(showUser) // запрос успешен - показать нового юзера\n    .catch(alert)   // неуспешен - вывести сообщение с ошибкой\n    .finally(() => {\n        (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closePopup)(popupProfile);\n        saveProfileButton.textContent = \"Сохранить\";\n    }); // в любом случае - закрыть попап\n}\n\nfunction cancelEditProfile() {\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closePopup)(popupProfile);\n}\n\n// найти кнопку, по клику открыть попап редактирования аватара\nconst popupAvatar = document.querySelector('.popup_edit-avatar');\nconst buttonEditAvatar = document.querySelector('.button-edit_avatar');\nconst buttonCancelAvatar = document.querySelector('.popup__button-close_edit-avatar');\nconst avatarImage = document.querySelector('.profile__avatar'); // присвоить переменной текстовое содержимое узла ДОМ\nconst avatarForm = document.forms['edit-avatar'];\nconst saveAvatarButton = popupAvatar.querySelector('.popup__button-save_edit-avatar');\n\nfunction initEditAvatar() {\n    buttonEditAvatar.addEventListener('click', showEditAvatar);  // Прицепить listener\n    buttonCancelAvatar.addEventListener('click', cancelEditAvatar);\n}\n\nfunction showEditAvatar() {\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openPopup)(popupAvatar);\n    const currentSrc = avatarImage.src; // присвоить переменной текстовое содержимое узла ДОМ\n    avatarForm.elements['avatar-link'].value = currentSrc;\n}\n\nfunction cancelEditAvatar() {\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closePopup)(popupAvatar);\n}\n\n\nfunction initEditAvatarForm () {\n    avatarForm.addEventListener('submit', saveEditAvatar);\n}\n\nfunction saveEditAvatar(submitEvent) {\n    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу\n    saveAvatarButton.textContent = \"Сохранение...\";\n    const newSrc = avatarForm.elements['avatar-link'].value; // присвоить переменной значение интпута\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.updateUserAvatar)(newSrc)\n    .then( () => avatarImage.src = newSrc) // запрос успешен - показать нового юзера\n    .catch(alert)   // неуспешен - вывести сообщение с ошибкой\n    .finally(() => {\n        (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closePopup)(popupAvatar);\n        saveAvatarButton.textContent = \"Сохранить\";\n    }); // в любом случае - закрыть попап\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/profile.js?");

/***/ }),

/***/ "./src/components/validate.js":
/*!************************************!*\
  !*** ./src/components/validate.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setSubmitButtonState\": () => (/* binding */ setSubmitButtonState),\n/* harmony export */   \"enableValidation\": () => (/* binding */ enableValidation)\n/* harmony export */ });\nfunction setSubmitButtonState(form, isFormValid, {submitButtonSelector}) { // Функция, переключающая состояние кнопки submit\n    const submitButton = form.querySelector(submitButtonSelector); // Найти кнопку в форме\n    submitButton.disabled = !isFormValid; // Сделать кнопку .disabled, если форма невалидна\n};\n\nfunction enableValidation({formSelector, inputSelector, errorClass, inputErrorClass, submitButtonSelector}) {\n    const formList = Array.from(document.querySelectorAll(formSelector));\n    formList.forEach((formElement) => {\n        formElement.addEventListener('submit', (evt) => {\n            evt.preventDefault();\n    });\n        setEventListeners(formElement, {\n            inputSelector,\n            errorClass,\n            inputErrorClass,\n            submitButtonSelector\n        });\n    });\n};\n\nfunction setEventListeners (formElement, {inputSelector, errorClass, inputErrorClass, submitButtonSelector}) {\n    const inputList = Array.from(formElement.querySelectorAll(inputSelector));\n    inputList.forEach((inputElement) => {\n    inputElement.addEventListener('input', () => {\n        isValid(formElement, inputElement, {\n            errorClass,\n            inputErrorClass,\n            submitButtonSelector\n        })\n      });\n    });\n  };\n\nfunction isValid (formElement, inputElement, {errorClass, inputErrorClass, submitButtonSelector}) {\n    if (!inputElement.validity.valid) {\n        showInputError(formElement, inputElement, inputElement.validationMessage, {\n            errorClass,\n            inputErrorClass\n        });\n    } else {\n        hideInputError(formElement, inputElement, {\n            errorClass,\n            inputErrorClass\n        });\n    }\n    setSubmitButtonState(formElement, formElement.checkValidity(), {\n        submitButtonSelector\n    });\n  };\n\nfunction showInputError (formElement, inputElement, errorMessage, {errorClass, inputErrorClass}) { //показ. ошибку в поле мод.окна\n    inputElement.classList.add(inputErrorClass);\n    const inputError = formElement.querySelector(`.${inputElement.name}-error`);\n    inputError.classList.add(errorClass);\n    inputError.textContent = errorMessage;\n}\n\nfunction hideInputError (formElement, inputElement, {errorClass, inputErrorClass}) { //скрывает ошибку в поле мод.окна\n    inputElement.classList.remove(inputErrorClass);\n    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);\n    errorElement.classList.remove(errorClass);\n    errorElement.textContent = '';\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/validate.js?");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _components_card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/card.js */ \"./src/components/card.js\");\n/* harmony import */ var _components_addItem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/addItem.js */ \"./src/components/addItem.js\");\n/* harmony import */ var _components_profile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/profile.js */ \"./src/components/profile.js\");\n/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/modal.js */ \"./src/components/modal.js\");\n/* harmony import */ var _components_validate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/validate.js */ \"./src/components/validate.js\");\n/* harmony import */ var _components_api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/api.js */ \"./src/components/api.js\");\n\n\n\n\n\n\n\n\n\nfunction initComponents() { //подключение кнопок и мод.окон\n\n    (0,_components_addItem_js__WEBPACK_IMPORTED_MODULE_2__.initAddItem)();\n\n    (0,_components_profile_js__WEBPACK_IMPORTED_MODULE_3__.initEditProfile)();\n\n    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_4__.initModal)();\n\n    (0,_components_profile_js__WEBPACK_IMPORTED_MODULE_3__.initEditProfileForm)();\n\n    (0,_components_profile_js__WEBPACK_IMPORTED_MODULE_3__.initEditAvatar)();\n\n    (0,_components_profile_js__WEBPACK_IMPORTED_MODULE_3__.initEditAvatarForm)();\n\n    (0,_components_addItem_js__WEBPACK_IMPORTED_MODULE_2__.initAddItemForm) ();\n\n    (0,_components_card_js__WEBPACK_IMPORTED_MODULE_1__.initCards)();\n\n    (0,_components_validate_js__WEBPACK_IMPORTED_MODULE_5__.enableValidation)({\n        formSelector: '.popup__form',\n        inputSelector: '.popup__form-field',\n        errorClass: 'popup__input-error_active',\n        inputErrorClass: 'popup__form-field_type_error',\n        submitButtonSelector: '.popup__button-save'\n    });\n}\n\nfunction initContent() {\n    (0,_components_api_js__WEBPACK_IMPORTED_MODULE_6__.loadUser)().then(user => {\n        (0,_components_profile_js__WEBPACK_IMPORTED_MODULE_3__.showUser)(user);\n        (0,_components_profile_js__WEBPACK_IMPORTED_MODULE_3__.setUserId)(user.id);\n    })\n    .catch(alert);\n\n    _components_card_js__WEBPACK_IMPORTED_MODULE_1__.initialCards.forEach(_components_addItem_js__WEBPACK_IMPORTED_MODULE_2__.addItem);\n    (0,_components_api_js__WEBPACK_IMPORTED_MODULE_6__.loadCards)().then(cards => {\n        cards.forEach(_components_addItem_js__WEBPACK_IMPORTED_MODULE_2__.addItem);\n    })\n    .catch(alert);\n}\n\ninitComponents(); // При загрузке скрипта инициализировать кнопки\ninitContent();\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/pages/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/index.js");
/******/ 	
/******/ })()
;