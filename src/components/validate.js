// начало 24.11.21
/* Создание класса FormValidator
имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
имеет публичный метод enableValidation, который включает валидацию формы.
Для каждой проверяемой формы создавайте экземпляр класса FormValidator. */
//Создайте класс FormValidator, который настраивает валидацию полей формы
const validateObj = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-field",
    buttonSelector: ".popup__button-save",
    inputErrorClass: "popup__input-error",
    inactiveButtonClass: "popup__botton_disabled",
};
export class FormValidator {
    constructor(validateObj, formSelector) {
        //принимает вторым параметром элемент той формы, которая валидируется
        this._form = document.querySelector(validateObj.formSelector); //находим форму
        //принимает в конструктор объект настроек с селекторами и классами формы;
        this._inputList = Array.from(
            this._form.querySelectorAll(validateObj.inputSelector) //преобразуем и возвращаем новый массив
        );
        this._submitButton = this._form.querySelector(
            validateObj.submitButtonSelector //находим кнопку
        );
        this._inactiveButtonClass = validateObj.inactiveButtonClass; //неактивный класс кнопки
        this._inputErrorClass = validateObj.inputerrorClass; // инпут с ошибкой
    }
    ///метод оперделения невалидного поля
    _isFormValid = (inputList) => {
        return inputList.every((item) => item.validity.valid);
    };
    // функция блокировки/разблокировки кнопки
    _toggleButtonState = (inputList, submitButton, validateObj) => {
        // если форма валидна, кнопка включения еще отключена
        if (isFormValid(inputList)) {
            // кнопку включить
            submitButton.disabled = false;
            submitButton.classList.remove(validateObj.inactiveButtonClass);
        } else {
            // кнопку выключить
            submitButton.disabled = true;
            submitButton.classList.add(validateObj.inactiveButtonClass);
        }
    };
    //показать ошибку
    _showInputError = (formElement, inputElement, validateObj) => {
        const errorElement = formElement.querySelector(
            `#${inputElement.name}-error`
        );
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(validateObj.inputErrorClass);
    };
    //скрыть ошибку
    _hideInputError = (formElement, inputElement, validateObj) => {
        const errorElement = formElement.querySelector(
            `#${inputElement.name}-error`
        );
        errorElement.textContent = "";
        inputElement.classList.remove(validateObj.inputErrorClass);
    };

    /// поверка на невалидный инпут
    _hasInvalidInput() {
        return this._inputList.every(function (input) {
            return input.validity.valid;
        });
    }
    //поиск валидных нпутов в форме
    _checkInputValidity = (formElement, inputElement, validateObj) => {
        // если валидно
        if (inputElement.validity.valid) {
            // скрыть ошибку
            hideInputError(formElement, inputElement, validateObj);
        } else {
            // иначе показать ошибку
            showInputError(formElement, inputElement, validateObj);
        }
    };
    //установить слушателей событий
    _setEventListeners = (formElement, validateObj) => {
        formElement.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        // найти все инпуты
        const inputList = Array.from(
            formElement.querySelectorAll(validateObj.inputSelector)
        );
        // найти кнопку
        const submitButton = formElement.querySelector(
            validateObj.buttonSelector
        );

        inputList.forEach((item) => {
            item.addEventListener("input", () => {
                checkInputValidity(formElement, item, validateObj);
                toggleButtonState(inputList, submitButton, validateObj);
            });
        });
        // установить начальное состояние кнопки
        toggleButtonState(inputList, submitButton, validateObj);
    };

    enableValidation = (validateObj) => {
        // найти все формы и создать из них массив
        const formList = Array.from(
            document.querySelectorAll(validateObj.formSelector)
        );
        // слушатель для формы каждой
        formList.forEach((item) => _setEventListeners(item, selectors));
    };
}

// конец

/* 
setSubmitButtonState;
export function setSubmitButtonState(
    form,
    isFormValid,
    { submitButtonSelector }
) {
    // Функция, переключающая состояние кнопки submit
    const submitButton = form.querySelector(submitButtonSelector); // Найти кнопку в форме
    submitButton.disabled = !isFormValid; // Сделать кнопку .disabled, если форма невалидна
}

export function enableValidation({
    formSelector,
    inputSelector,
    errorClass,
    inputErrorClass,
    submitButtonSelector,
}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, {
            inputSelector,
            errorClass,
            inputErrorClass,
            submitButtonSelector,
        });
    });
}

function setEventListeners(
    formElement,
    { inputSelector, errorClass, inputErrorClass, submitButtonSelector }
) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement, {
                errorClass,
                inputErrorClass,
                submitButtonSelector,
            });
        });
    });
}

function isValid(
    formElement,
    inputElement,
    { errorClass, inputErrorClass, submitButtonSelector }
) {
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            {
                errorClass,
                inputErrorClass,
            }
        );
    } else {
        hideInputError(formElement, inputElement, {
            errorClass,
            inputErrorClass,
        });
    }
    setSubmitButtonState(formElement, formElement.checkValidity(), {
        submitButtonSelector,
    });
}

function showInputError(
    formElement,
    inputElement,
    errorMessage,
    { errorClass, inputErrorClass }
) {
    //показ. ошибку в поле мод.окна
    inputElement.classList.add(inputErrorClass);
    const inputError = formElement.querySelector(`.${inputElement.name}-error`);
    inputError.classList.add(errorClass);
    inputError.textContent = errorMessage;
}

function hideInputError(
    formElement,
    inputElement,
    { errorClass, inputErrorClass }
) {
    //скрывает ошибку в поле мод.окна
    inputElement.classList.remove(inputErrorClass);
    const errorElement = formElement.querySelector(
        `.${inputElement.name}-error`
    );
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
}
 */
