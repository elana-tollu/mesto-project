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

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Api\": () => (/* binding */ Api)\n/* harmony export */ });\nclass Api {\n    constructor(baseUrl, token) {\n        this.baseUrl = baseUrl;\n        this.token = token;\n    }\n\n    _request({method, resource, data}) {\n        return fetch(`${this.baseUrl}${resource}`, {\n            method,\n            headers: {\n                Authorization: this.token,\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify(data)\n        })\n        .then ((response) => {\n            if (response.ok) {\n                return response.json()\n            } else {\n                return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);\n            }\n        })\n    }\n\n    loadUser() {\n        return this._request({  // возвращаем функцию\n            method: 'GET',\n            resource: 'users/me'\n        })\n        .then(user => ({ // запрос успешен - присвоить ключам новые значения\n            name: user.name,\n            about: user.about,\n            avatar: user.avatar,\n            id: user._id\n        }))\n    }\n\n    updateUser({name, about}) {\n        return this._request({\n            method: 'PATCH',\n            resource: 'users/me',\n            data: {name, about}\n        })\n        .then(user => ({\n            name: user.name,\n            about: user.about,\n            avatar: user.avatar\n        }))\n    }\n\n    updateUserAvatar(link) {\n        return this._request({\n            method: 'PATCH',\n            resource: 'users/me/avatar',\n            data: {avatar: link}\n        });\n    }\n\n    loadCards() {\n        return this._request({\n            method: 'GET',\n            resource: 'cards'\n        })\n        .then((cards) => {\n            return cards.map( card => ({\n                name: card.name,\n                link: card.link,\n                likesCount: card.likes.length,\n                likes: card.likes,\n                id: card._id,\n                ownerId: card.owner._id\n            }));\n        })\n    }\n\n    addCard(card) {\n        return this._request({\n            method: 'POST',\n            resource: 'cards',\n            data: {\n                name: card.name,\n                link: card.link\n            }\n        })\n        .then(card => ({\n            name: card.name,\n            link: card.link,\n            likesCount: card.likes.length,\n            likes: card.likes,\n            id: card._id,\n            ownerId: card.owner._id\n        }));\n    }\n\n    likeCard(cardId) {\n        return this._request({\n            method: 'PUT',\n            resource: `cards/likes/${cardId}`\n        })\n        .then(card => ({\n            name: card.name,\n            link: card.link,\n            likesCount: card.likes.length,\n            likes: card.likes,\n            id: card._id,\n            ownerId: card.owner._id\n        })\n        );\n    }\n\n    unlikeCard(cardId) {\n        return this._request({\n            method: 'DELETE',\n            resource: `cards/likes/${cardId}`\n        })\n        .then(card => ({\n            name: card.name,\n            link: card.link,\n            likesCount: card.likes.length,\n            likes: card.likes,\n            id: card._id,\n            ownerId: card.owner._id\n        })\n        );\n    }\n\n    deleteCard(cardId) {\n        return this._request({\n            method: 'DELETE',\n            resource: `cards/${cardId}`\n        });\n    }\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/Api.js?");

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Card\": () => (/* binding */ Card)\n/* harmony export */ });\nclass Card {\n    constructor(\n        cardData,\n        templateSelector,\n        handleCardClick,\n        getCurrentUserId,\n        handleCardLike,\n        handleCardUnlike,\n        handleCardDelete\n    ) {\n        this._cardData = cardData;\n        this._templateSelector = templateSelector;\n        this._handleCardClick = handleCardClick;\n        this._getCurrentUserId = getCurrentUserId;\n        this._handleCardLike = handleCardLike;\n        this._handleCardUnlike = handleCardUnlike;\n        this._handleCardDelete = handleCardDelete;\n    }\n\n    makeElement() {\n        const cardTemplate = document.querySelector(\n            this._templateSelector\n        ).content; // нашли шаблон карточки\n        this._card = cardTemplate.querySelector(\".element\").cloneNode(true); // создаем новый узел ДОМ\n\n        const trashButton = this._card.querySelector(\".element__button-trash\"); //найти кнопку удаления\n        const likeButton = this._card.querySelector(\".button-like\"); // найти кнопку лайка\n\n        const image = this._card.querySelector(\".element__image\"); // найти карточку\n        image.src = this._cardData.link; // присвоить значения\n        image.alt = this._cardData.name;\n\n        const heading = this._card.querySelector(\".element__name\"); // найти заголовок\n        heading.textContent = this._cardData.name; // присвоить значение\n\n        const likesCount = this._card.querySelector(\".element__like-count\"); // найти счетчик лайков\n        likesCount.textContent = this._cardData.likesCount; // присвоить значение\n\n        this._setEventListeners({image, trashButton, likeButton, likesCount});\n\n        return this._card;\n    }\n\n    _setEventListeners({image, trashButton, likeButton, likesCount}) {\n        if (this._getCurrentUserId() === this._cardData.ownerId) {\n            trashButton.addEventListener(\"click\", () => this._deleteItem()); // прицепить слушатель\n        } else {\n            trashButton.remove();\n        }\n\n        if (this._cardData.likes.find((like) => like._id === this._getCurrentUserId())) {\n            likeButton.classList.add(\"button-like_active\");\n        }\n\n        likeButton.addEventListener(\"click\", () => {\n            if (likeButton.classList.contains(\"button-like_active\")) {\n                this._handleCardUnlike(this._cardData.id)\n                    .then((unlikedCard) => {\n                        likesCount.textContent = unlikedCard.likesCount;\n                        likeButton.classList.remove(\"button-like_active\");\n                    })\n                    .catch(alert);\n            } else {\n                this._handleCardLike(this._cardData.id)\n                    .then((likedCard) => {\n                        likesCount.textContent = likedCard.likesCount;\n                        likeButton.classList.add(\"button-like_active\");\n                    })\n                    .catch(alert);\n            }\n        });\n\n        image.addEventListener(\"click\", () => this._handleCardClick()); // прицепить слушатель\n    }\n\n    _deleteItem() {\n        this._handleCardDelete(this._cardData.id)\n            .then(() => this._card.remove())\n            .catch(alert);\n    }\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/Card.js?");

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FormValidator\": () => (/* binding */ FormValidator)\n/* harmony export */ });\nclass FormValidator {\n    constructor(validationObject, formSelector) {\n        this._form = document.querySelector(formSelector);\n        this._inputList = Array.from(\n            this._form.querySelectorAll(validationObject.inputSelector)\n        );\n        this._submitButton = this._form.querySelector(\n            validationObject.submitButtonSelector\n        );\n        this._errorClass = validationObject.errorClass;\n        this._inputErrorClass = validationObject.inputErrorClass;\n        this._buttonElement = this._form.querySelector(\n            validationObject.submitButtonSelector\n        );\n    }\n\n    ///наложения слушателя для валидации инпутов конкретной формы\n    enableValidation() {\n        this._form.addEventListener('submit', function (evt) {\n            evt.preventDefault();\n        });\n        this._setEventListeners();\n    }\n\n    //метод для очистки ошибок\n    resetValidation() {\n        this._setSubmitButtonState();\n\n        this._inputList.forEach((input) => {\n            this._hideInputError(input);\n        });\n    }\n\n    _setEventListeners() {\n        this._inputList.forEach((inputElement) => {\n            inputElement.addEventListener('input', () =>\n                this._isValid(inputElement)\n            );\n        });\n    }\n\n    _isValid(input) {\n        if (!input.validity.valid) {\n            this._showInputError(input);\n        } else {\n            this._hideInputError(input);\n        }\n        this._setSubmitButtonState();\n    }\n\n    //добавление ошибки\n    _showInputError(input) {\n        input.classList.add(this._inputErrorClass);\n        const inputError = this._form.querySelector(`.${input.name}-error`);\n        inputError.classList.add(this._errorClass);\n        inputError.textContent = input.validationMessage;\n    }\n\n    //удаление ошибки\n    _hideInputError(input) {\n        input.classList.remove(this._inputErrorClass);\n        const inputError = this._form.querySelector(`.${input.name}-error`);\n        inputError.classList.remove(this._errorClass);\n        inputError.textContent = '';\n    }\n\n    //блокировка/разблокировка кнопки\n    _setSubmitButtonState() {\n        if (!this._form.checkValidity()) {\n            this._submitButton.disabled = true;\n        } else {\n            this._submitButton.disabled = false;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/FormValidator.js?");

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Popup\": () => (/* binding */ Popup)\n/* harmony export */ });\nclass Popup {\n    constructor(popupSelector, bodySelector) {\n      this._popup = document.querySelector(popupSelector);\n      this._body = document.querySelector(bodySelector);\n    }\n\n    open() { // открывает мод.окно\n        this._popup.classList.add('popup_opened');\n        this._body.addEventListener('keydown', event => this._handleEscClose(event));\n    }\n\n    close() { // закрывает мод.окно\n        this._popup.classList.remove('popup_opened');\n        this._body.removeEventListener('keydown', event => this._handleEscClose(event));\n    }\n\n    _handleEscClose(event) {\n        if(event.key === 'Escape') {\n            this.close();\n        }\n    }\n\n    setEventListeners() {\n        const overlay = this._popup.querySelector('.popup__overlay');\n        overlay.addEventListener('click', () => this.close());\n        const buttonClose = this._popup.querySelector('.popup__button-close');\n        buttonClose.addEventListener('click', () => this.close());\n    }\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/Popup.js?");

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PopupWithForm\": () => (/* binding */ PopupWithForm)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\n\nclass PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup {\n    constructor(selector, bodySelector, submitHandler) {\n        super(selector, bodySelector);\n        this._submitHandler = submitHandler;\n        this._form = this._popup.querySelector('.popup__form');\n        this._submitButton = this._popup.querySelector('.popup__button-save');\n    }\n\n    prefillForm(formData) {\n        for (const [name, value] of Object.entries(formData)) {\n            this._form.elements[name].value = value;\n        }\n    }\n\n    setEventListeners() {\n        super.setEventListeners();\n        this._form.addEventListener('submit', () => {\n            const formData = this._getInputValues();\n            const submitButtonText = this._submitButton.textContent;\n            this._submitButton.textContent = \"Сохранение...\";\n            this._submitHandler(formData)\n            .finally(() => {\n                this._submitButton.textContent = submitButtonText;\n                this.close();\n            });\n        });\n    }\n\n    _getInputValues() {\n        const inputs = this._form.querySelectorAll('.popup__form-field'); // находим поля формы\n        return Array.from(inputs) // массив из полей\n            .reduce((inputValues, input) => { // собираем значения полей в один объект\n                return {\n                    ...inputValues, // для нового значения аккумулятора используем все накопленные в нем значения\n                    [input.name]: input.value, // добавляем новое значение из текущего инпута\n                }\n            }, {}); // начинаем собирать с пустого объекта\n    }\n\n    close() { // закрывает мод.окно\n        super.close();\n        this._form.reset();\n    }\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/PopupWithForm.js?");

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PopupWithImage\": () => (/* binding */ PopupWithImage)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\n\nclass PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup {\n    constructor(selector, bodySelector) {\n        super(selector, bodySelector);\n      }\n\n    open(src, alt) { // открывает мод.окно\n        super.open();\n\n        const popupImage = this._popup.querySelector(\".element__image_open\");\n        popupImage.src = src;\n        popupImage.alt = alt;\n        const popupTitle = this._popup.querySelector(\".element__name_open\");\n        popupTitle.textContent = alt;\n    }\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/PopupWithImage.js?");

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Section\": () => (/* binding */ Section)\n/* harmony export */ });\nclass Section {\n    constructor({ renderer }, selector) {\n        this._renderer = renderer;\n        this._container = document.querySelector(selector);\n    }\n\n    renderItem(item) {\n        const element = this._renderer(item);\n        this.addItem(element);\n    }\n\n    addItem(element) {\n        this._container.prepend(element);\n    }\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/Section.js?");

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserInfo\": () => (/* binding */ UserInfo)\n/* harmony export */ });\nclass UserInfo {\n    constructor({selectorName,\n        selectorDescription,\n        selectorAvanar,\n        loadUser,\n        updateUser\n    }) {\n        this._elementName = document.querySelector(selectorName);\n        this._elementDescription = document.querySelector(selectorDescription);\n        this._elementAvatar = document.querySelector(selectorAvanar);\n        this._loadUser = loadUser;\n        this._updateUser = updateUser;\n    }\n\n    getUserInfo() {\n        return this._loadUser();\n    }\n\n    setUserInfo(userData) {\n        return this._updateUser(userData)\n        .then ( user => {\n            this.renderUserInfo(user);\n        });\n    }\n\n    renderUserInfo(user) {\n        this._elementName.textContent = user.name;\n        this._elementDescription.textContent = user.about;\n        this._elementAvatar.src = user.avatar;\n    }\n\n    setUserId(userId) {\n        this._userId = userId;\n    }\n\n    getUserId() {\n        return this._userId;\n    }\n\n    getName() {\n        return this._elementName.textContent;\n    }\n\n    getDescription() {\n        return this._elementDescription.textContent;\n    }\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/UserInfo.js?");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/FormValidator.js */ \"./src/components/FormValidator.js\");\n/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/constants.js */ \"./src/utils/constants.js\");\n/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Card.js */ \"./src/components/Card.js\");\n/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PopupWithImage.js */ \"./src/components/PopupWithImage.js\");\n/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithForm.js */ \"./src/components/PopupWithForm.js\");\n/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Api.js */ \"./src/components/Api.js\");\n/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/UserInfo.js */ \"./src/components/UserInfo.js\");\n/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Section.js */ \"./src/components/Section.js\");\n\n\n\n\n\n\n\n\n\n\nconst baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-3/';\nconst token = '601ed199-89d3-4904-a997-8272583014cc';\n\nconst api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_6__.Api(baseUrl, token);\nconst buttonEditProfile = document.querySelector('.button-edit_profile'); // Найти кнопку с карандашом\nconst buttonEditAvatar = document.querySelector('.button-edit_avatar');\nconst buttonAdd = document.querySelector('.button-add'); // Найти кнопку с +\n\nfunction initComponents() {\n    // запускаем валидацию формы form_edit-profile\n    const userFormValidation = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__.FormValidator(\n        _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__.objForm,\n        '.popup__form_edit-profile'\n    );\n\n    userFormValidation.enableValidation();\n\n    // запускаем валидацию формы form_add-item\n    const placeFormValidation = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__.FormValidator(\n        _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__.objForm,\n        '.popup__form_add-item'\n    );\n    placeFormValidation.enableValidation();\n\n    // запускаем валидацию формы form_edit-avatar\n    const linkFormValidation = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__.FormValidator(\n        _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__.objForm,\n        '.popup__form_edit-avatar'\n    );\n    linkFormValidation.enableValidation();\n\n    const popupImage = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__.PopupWithImage('.popup_image', '.page');\n    popupImage.setEventListeners();\n\n    const userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_7__.UserInfo({\n        selectorName: '.profile__name',\n        selectorDescription: '.profile__description',\n        selectorAvanar: '.profile__avatar',\n        loadUser: () => api.loadUser(),\n        updateUser: (userData) => api.updateUser(userData),\n    });\n\n    const popupEditAvatar = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__.PopupWithForm(\n        '.popup_edit-avatar',\n        '.page',\n        (formData) => {\n            return api\n                .updateUserAvatar(formData['avatar-link'])\n                .then((user) => userInfo.renderUserInfo(user))\n                .catch(alert);\n        }\n    );\n    popupEditAvatar.setEventListeners();\n    buttonEditAvatar.addEventListener('click', () => {\n        popupEditAvatar.open();\n        linkFormValidation.resetValidation();\n    });\n\n    const cardsSection = new _components_Section_js__WEBPACK_IMPORTED_MODULE_8__.Section(\n        {\n            renderer: (cardData) =>\n                new _components_Card_js__WEBPACK_IMPORTED_MODULE_3__.Card(\n                    cardData,\n                    '#card-template',\n                    () => popupImage.open(cardData.link, cardData.name),\n                    () => userInfo.getUserId(),\n                    (cardId) => api.likeCard(cardId),\n                    (cardId) => api.unlikeCard(cardId),\n                    (cardId) => api.deleteCard(cardId)\n                ).makeElement(),\n        },\n        '.elements__list'\n    );\n\n    const popupEditProfile = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__.PopupWithForm(\n        '.popup_edit-profile',\n        '.page',\n        (formData) => {\n            return userInfo\n                .setUserInfo({\n                    name: formData['user-name'],\n                    about: formData['user-description'],\n                })\n                .catch(alert);\n        }\n    );\n    popupEditProfile.setEventListeners();\n    buttonEditProfile.addEventListener('click', () => {\n        popupEditProfile.open();\n        userFormValidation.resetValidation();\n        popupEditProfile.prefillForm({\n            'user-name': userInfo.getName(),\n            'user-description': userInfo.getDescription(),\n        });\n    });\n\n    const popupAddItem = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__.PopupWithForm('.popup_add-item', '.page', (cardData) => {\n        return api\n            .addCard({\n                name: cardData['item-name'],\n                link: cardData['item-link'],\n            })\n            .then((card) => cardsSection.renderItem(card))\n            .catch(alert);\n    });\n    popupAddItem.setEventListeners();\n    buttonAdd.addEventListener('click', () => {\n        popupAddItem.open();\n        placeFormValidation.resetValidation();\n    });\n\n    Promise.all([userInfo.getUserInfo(), api.loadCards()]) //заменила вызов функций на методы api\n        .then(([user, cards]) => {\n            userInfo.renderUserInfo(user);\n            userInfo.setUserId(user.id);\n            cards.reverse().forEach((card) => cardsSection.renderItem(card));\n        })\n        .catch(alert);\n}\n\ninitComponents(); // При загрузке скрипта инициализировать кнопки\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/pages/index.js?");

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"objForm\": () => (/* binding */ objForm)\n/* harmony export */ });\nconst objForm = {\n    formSelector: '.popup__form',\n    inputSelector: '.popup__form-field',\n    submitButtonSelector: '.popup__button-save',\n    inactiveButtonClass: 'popup__button_disabled',\n    errorClass: 'popup__input-error_active',\n    inputErrorClass: 'popup__form-field_type_error',\n};\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/utils/constants.js?");

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