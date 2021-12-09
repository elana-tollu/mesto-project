export class Popup {
    constructor(popupSelector, bodySelector) {
        this._popup = document.querySelector(popupSelector);
        this._body = document.querySelector(bodySelector);
    }

    open() {
        // открывает мод.окно
        this._popup.classList.add('popup_opened');
        this._body.addEventListener('keydown', (event) =>
            this._handleEscClose(event)
        );
    }

    close() {
        // закрывает мод.окно
        this._popup.classList.remove('popup_opened');
        this._body.removeEventListener('keydown', (event) =>
            this._handleEscClose(event)
        );
        this.removeEventListeners();
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        const overlay = this._popup.querySelector('.popup__overlay');
        overlay.addEventListener('click', () => this.close());
        const buttonClose = this._popup.querySelector('.popup__button-close');
        buttonClose.addEventListener('click', () => this.close());
    }
    removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose);
    }
}
