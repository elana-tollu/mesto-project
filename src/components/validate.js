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
