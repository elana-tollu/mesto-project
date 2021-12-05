export class Section {
    constructor({ renderer }, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItem(item) {
        const element = this._renderer(item);
        this.addItem(element);
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
