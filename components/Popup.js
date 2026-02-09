export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_visible");
  }

  close() {
    this._popupSelector.classList.remove("popup_visible");
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this._popupSelector.addEventListener("keydown", this._handleEscapeClose);
  }
}
