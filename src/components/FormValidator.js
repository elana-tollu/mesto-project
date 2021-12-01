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
        this._inputErrorClass = validationObject.inputErrorClass;
        this._buttonElement = this._form.querySelector(
            validationObject.submitButtonSelector
        );
    }

    //оперделение невалидного поля
    _isValid(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    }
    //поиск валидных инпутов во всех инпутах формы
    _checkInputValidity() {
        this.setSubmitButtonState();
        this._inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._errorContainer = this._form.querySelector(
                    `.${input.id}-error`
                );
                this.setSubmitButtonState();
                this._isValid(input);
            });
        });
    }

    // поверка на невалидный инпут
    _hasInvalidInput() {
        return this._inputList.every(function (input) {
            return input.validity.valid;
        });
    }

    //блокировка/разблокировка кнопки
    setSubmitButtonState() {
        if (!this._hasInvalidInput()) {
            this._submitButton.disabled = true;
        } else {
            this._submitButton.disabled = false;
        }
    }

    //добавление ошибки
    _showInputError(input) {
        input.classList.add(this._inputErrorClass);
        this._errorContainer.textContent = input.validationMessage;
    }

    //удаление ошибки
    _hideInputError(input) {
        input.classList.remove(this._inputErrorClass);
        this._errorContainer.textContent = "";
    }

    ///наложения слушателя для валидации инпутов конкретной формы
    enableValidation() {
        this._form.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        this._checkInputValidity();
    }
}
