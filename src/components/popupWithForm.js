import { Popup } from '../components/popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, submitHandler) {
        super(selector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        const formData = this._getInputValues();
        this._form.addEventListener('submit', () => this._submitHandler(formData));
    }

    _getInputValues() {
        const inputs = this._form.querySelectorAll('.popup__form-field'); // находим поля формы
        return Array.from(inputs) // массив из полей
            .reduce((inputValues, input) => { // собираем значения полей в один объект
                return {
                    ...inputValues, // для нового значения аккумулятора используем все накопленные в нем значения
                    [input.id]: input.value, // добавляем новое значение из текущего инпута
                }
            }, {}); // начинаем собирать с пустого объекта
    }

    close() { // закрывает мод.окно
        super.close();
        this._form.reset();
    }
}

window.PopupWithForm = PopupWithForm;
