import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, bodySelector, submitHandler) {
        super(selector, bodySelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__button-save');
    }

    prefillForm(formData) {
        for (const [name, value] of Object.entries(formData)) {
            this._form.elements[name].value = value;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
            const formData = this._getInputValues();
            const submitButtonText = this._submitButton.textContent;
            this._submitButton.textContent = 'Сохранение...';
            this._submitHandler(formData)
                .then(() => this.close())
                .finally(() => {
                    this._submitButton.textContent = submitButtonText;
                });
        });
    }

    _getInputValues() {
        const inputs = this._form.querySelectorAll('.popup__form-field'); // находим поля формы
        return Array.from(inputs) // массив из полей
            .reduce((inputValues, input) => {
                // собираем значения полей в один объект
                return {
                    ...inputValues, // для нового значения аккумулятора используем все накопленные в нем значения
                    [input.name]: input.value, // добавляем новое значение из текущего инпута
                };
            }, {}); // начинаем собирать с пустого объекта
    }

    close() {
        // закрывает мод.окно
        super.close();
        this._form.reset();
    }
}
