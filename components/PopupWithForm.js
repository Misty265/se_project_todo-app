import { Popup } from "./Popup.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormSubmitCallback = handleFormSubmit;
    this._formElement = this._popupSelector.querySelector("form");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
    this._name = this._formElement.querySelector("#todo-name");
    this._date = this._formElement.querySelector("#todo-date");
  }

  _getInputValues() {
    const newTodo = {
      name: this._name.value,
      date: new Date(this._date.value),
      completed: false,
      id: uuidv4(),
    };
    return newTodo;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this.close();
      this._formElement.reset();
      this._handleFormSubmit(values);
    });
  }
}
