
export function initInput (form, inputName) { //валидность полей мод.окон
    const input = form[inputName]; // Найти поле с именем
    input.addEventListener('change', () => { // Повесить обработчик не на ввод, а на изменение
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

function setSubmitButtonState(form, isFormValid) { // Функция, переключающая состояние кнопки submit
    const submitButton = form.querySelector('.popup__button-save'); // Найти кнопку в форме
    submitButton.disabled = !isFormValid; // Сделать кнопку .disabled, если форма невалидна
};

function showInputError (inputElement, errorMessage) { //показ. ошибку в поле мод.окна
    inputElement.classList.add('popup__form-field_type_error');
    const inputError = document.querySelector(`.${inputElement.name}-error`);
    inputError.classList.add('popup__input-error_active');
    inputError.textContent = errorMessage;
}

function hideInputError (element) { //скрывает ошибку в поле мод.окна
    element.classList.remove('popup__form-field_type_error');
}


