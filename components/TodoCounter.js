export default class TodoCounter {
  constructor(todos, selector) {
    this._element = selector.element;
    this._completed = selector.completed;
    this._total = selector.total;
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed = ++this._completed;
    } else {
      this._completed = --this._completed;
    }
  };

  updateTotal = (increment) => {
    if (increment) {
      this._total = ++this._total;
    } else {
      this._total = --this._total;
    }
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
