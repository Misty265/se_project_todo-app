class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
      popupSelector.clear();
      popupSelector.classList.add("popup_visible");
      popupSelector.openModal();
    };

  close() { 
    this._popupSelector.clear()
    this._popupSelector.classList.remove("popup_visible");
    this._popupSelector.closemModal();
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }

    setEventListeners() {
        this._popupSelector.addEventListener("click", (evt) => {
            if (evt.target === this.popupSelector.closest)
                this.close();
        });
    }
};
}