export class Section {
  constructor({ items, containerSelector }) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }
}
