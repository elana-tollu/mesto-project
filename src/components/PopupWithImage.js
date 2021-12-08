import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selector, bodySelector) {
        super(selector, bodySelector);
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
