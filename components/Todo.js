export class Todo {
  constructor(data, counter, selector) {
    this._data = data;
    this._element = null;
    this._deleteButton = null;
    this._checkbox = null;
    this._selector = selector;
    this._dateElement = null;
    this._nameElement = null;
    this._counter = counter;
  }
  _setEventListeners() {
    this._deleteButton.addEventListener("click", (evt) => {
      this._deleteButton.closest(".todo").remove();
      this._counter.updateTotal(false);
    });
    this._checkbox.addEventListener("change", () => {
      this._data.completed = this._checkbox.checked;
      this._counter.updateCompleted(this._data.completed);
    });
  }

  getView() {
    this._element = document
      .querySelector("#todo-template")
      .content.cloneNode(true);

    this._deleteButton = this._element.querySelector(".todo__delete-btn");
    this._checkbox = this._element.querySelector(".todo__completed");
    this._dateElement = this._element.querySelector(".todo__date");
    this._nameElement = this._element.querySelector(".todo__name");
    this._nameElement.textContent = this._data.name;
    this._checkbox.checked = this._data.completed;
    this._setEventListeners();
    if (!isNaN(Number(this._data.date))) {
      const dueDate = new Date(this._data.date);
      const dateSimplified = (date) => {
        date = `Due: ${date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
        return date;
      };
      this._dateElement.textContent = dateSimplified(dueDate);
    } else {
      this._dateElement.textContent = "";
    }

    return this._element;
  }
}
