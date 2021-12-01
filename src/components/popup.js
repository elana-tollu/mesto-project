const body = document.querySelector('.page');

export class Popup {
    constructor(selector) {
      this._popup = document.querySelector(selector);
    }

    open() { // открывает мод.окно
        this._popup.classList.add('popup_opened');
        body.addEventListener('keydown', event => this.handleEscClose(event));
    }

    close() { // закрывает мод.окно
        this._popup.classList.remove('popup_opened');
        body.removeEventListener('keydown', event => this.handleEscClose(event));
    }

    handleEscClose(event) {
        if(event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        const overlay = this._popup.querySelector('.popup__overlay');
        overlay.addEventListener('click', () => this.close());
        const buttonClose = this._popup.querySelector('.popup__button-close');
        buttonClose.addEventListener('click', () => this.close());
    }
}

window.Popup = Popup;
