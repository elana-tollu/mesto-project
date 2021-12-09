export class Popup {
    constructor(popupSelector, bodySelector) {
        this._popup = document.querySelector(popupSelector);
        this._body = document.querySelector(bodySelector);
        const handleEscClose = (event) => {
            if (event.key === 'Escape') {
                this.close();
            }
        };
        this._handleEscClose = handleEscClose.bind(this);
    }

    open() {
        // открывает мод.окно
        this._popup.classList.add('popup_opened');
        this._body.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        // закрывает мод.окно
        this._popup.classList.remove('popup_opened');
        this._body.removeEventListener('keydown', this._handleEscClose);
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
