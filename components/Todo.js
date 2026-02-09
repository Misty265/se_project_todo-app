import { v4 as uuidv4 } from "https://jspm.dev/uuid";
export class Todo {
  constructor(data, selector) {
    this._data = data;
    this._element = null;
    this._deleteButton = null;
    this._checkbox = null;
    this._selector = selector;
    this._dateElement = null;
    this._nameElement = null;
  }
  _setEventListeners() {
    this._deleteButton.addEventListener("click", (evt) => {
      this._deleteButton.closest(".todo").remove();
    });
    this._checkbox.addEventListener("change", () => {
      this._data.completed = this._checkbox.checked;
    });
  }

  getView() {
    this._element = document
      .querySelector("#todo-template")
      .content.cloneNode(true);

    const dueDate = new Date(this._data.date);
    this._deleteButton = this._element.querySelector(".todo__delete-btn");
    this._checkbox = this._element.querySelector(".todo__completed");
    this._dateElement = this._element.querySelector(".todo__date");
    this._nameElement = this._element.querySelector(".todo__name");
    this._nameElement.textContent = this._data.name;
    this._dateElement.textContent = this.formatDueDate(dueDate);
    this._checkbox.checked = this._data.completed;
    this._setEventListeners();
    return this._element;
  }
  formatDueDate = (date) => {
    if (!isNaN(date)) {
      this._dateElement.textContent = `Due: ${date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      this._dateElement.textContent = "No due date";
    }

    return this._dateElement.textContent;
  };
}
