export class TodoCounter {
  constructor(todos, selector) {
    this._todos = todos;
    this._selector = selector;
    this._element = document.querySelector(".counter__text");
    this._completed = 0;
    this._total = 0;
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
