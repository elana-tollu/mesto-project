import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
      }

    open(src, alt) { // открывает мод.окно
        super.open();

        const popupImage = this._popup.querySelector(".element__image_open");
        popupImage.src = src;
        popupImage.alt = alt;
        const popupTitle = this._popup.querySelector(".element__name_open");
        popupTitle.textContent = alt;
    }
}

window.PopupWithImage = PopupWithImage;
