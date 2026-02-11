export class TodoCounter {
  constructor(todos, selector) {
    this._todos = todos;
    this._selector = selector;
    this._element = document.querySelector(".counter__text");
    this._completed = 0;
    this._total = 0;
  }

  updateCompleted = (isCompleted) => {
    if (isCompleted) {
      this._completed += 1;
    } else {
      this._completed -= 1;
    }
    this._updateText();
  };

  updateTotal = (isAdded) => {
    if (isAdded) {
      this._total += 1;
    } else {
      this._total -= 1;
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
