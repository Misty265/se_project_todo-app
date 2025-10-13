import { v4 as uuidv4 } from "https://jspm.dev/uuid";
export class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });
    this._checkbox.addEventListener("change", () => {
      this._data.completed = this._checkbox.checked;
    });
  }
  getView() {
    const todoTemplate = document.querySelector("#todo-template");
    this._element = todoTemplate.content.querySelector(".todo").cloneNode(true);
    this._nameElement = this._element.querySelector(".todo__name");
    this._checkbox = this._element.querySelector(".todo__completed");
    this._label = this._element.querySelector(".todo__label");
    this._dateElement = this._element.querySelector(".todo__date");
    this._deleteButton = this._element.querySelector(".todo__delete-btn");
    this._nameElement.textContent = this._data.name;
    this._checkbox.checked = this._data.completed;
    this._checkbox.id = `todo-${this._data.id}`;
    this._label.setAttribute("for", `todo-${this._data.id}`);
    if (!this._data.id) {
      this._data.id = uuidv4();
    }
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._dateElement.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      this._dateElement.textContent = "No due date";
    }
    this._setEventListeners();

    return this._element;
  }
}
