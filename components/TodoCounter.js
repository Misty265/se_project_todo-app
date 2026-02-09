export class TodoCounter {
  constructor({ element, completed, total }, selector) {
    this._element = selector.querySelector(element);
    this._completed = completed;
    this._total = total;
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed = ++this._completed;
    } else {
      this._completed = --this._completed;
    }
    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment) {
      this._total = ++this._total;
    } else {
      this._total = --this._total;
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
