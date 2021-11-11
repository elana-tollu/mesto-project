
export function initInput (form, inputName) { //валидность полей мод.окон
    const input = form[inputName]; // Найти поле с именем
    input.addEventListener('input', () => { // Повесить обработчик не на ввод, а на изменение
        const isValid = input.checkValidity(); // Положить результат проверки валидности в переменную
        setSubmitButtonState(form, isValid); // Вызвать ф., переключающую состояние кнопки

        if (isValid) { //Если форма валидна
            hideInputError(input);
        } else {
            const message = input.validationMessage;
            showInputError (input, message)
        }
    });
}

export function setSubmitButtonState(form, isFormValid) { // Функция, переключающая состояние кнопки submit
    const submitButton = form.querySelector('.popup__button-save'); // Найти кнопку в форме
    submitButton.disabled = !isFormValid; // Сделать кнопку .disabled, если форма невалидна
};

function showInputError (formElement, inputElement, errorMessage) { //показ. ошибку в поле мод.окна
    inputElement.classList.add('popup__form-field_type_error');
    const inputError = formElement.querySelector(`.${inputElement.name}-error`);
    inputError.classList.add('popup__input-error_active');
    inputError.textContent = errorMessage;
}

function hideInputError (formElement, inputElement) { //скрывает ошибку в поле мод.окна
    inputElement.classList.remove('popup__form-field_type_error');
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
}

export function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
    });
        setEventListeners(formElement);
    });
};

function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-field'));
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)
      });
    });
  };

function isValid (formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
    setSubmitButtonState(formElement, formElement.checkValidity());
  };
