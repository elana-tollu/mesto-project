export class FormValidator {
    constructor(validationObject, formSelector) {
        this._form = document.querySelector(formSelector);
        this._inputList = Array.from(
            this._form.querySelectorAll(validationObject.inputSelector)
        );
        this._submitButton = this._form.querySelector(
            validationObject.submitButtonSelector
        );
        this._inactiveButtonClass = validationObject.inactiveButtonClass;
        this._errorClass = validationObject.errorClass;
        this._inputErrorClass = validationObject.inputErrorClass;
        this._buttonElement = this._form.querySelector(
            validationObject.submitButtonSelector
        );
    }

    ///наложения слушателя для валидации инпутов конкретной формы
    enableValidation() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () =>
                this._isValid(inputElement)
            );
        });
    }

    _isValid(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
        this._setSubmitButtonState();
    }

    //добавление ошибки
    _showInputError(input) {
        input.classList.add(this._inputErrorClass);
        const inputError = this._form.querySelector(`.${input.name}-error`);
        inputError.classList.add(this._errorClass);
        inputError.textContent = input.validationMessage;
    }

    //удаление ошибки
    _hideInputError(input) {
        input.classList.remove(this._inputErrorClass);
        const inputError = this._form.querySelector(`.${input.name}-error`);
        inputError.classList.remove(this._errorClass);
        inputError.textContent = '';
    }
    //метод для очистки ошибок
    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement);
        });
    }

    //блокировка/разблокировка кнопки
    _setSubmitButtonState() {
        this._submitButton.disabled = !this._form.checkValidity();
    }
}
