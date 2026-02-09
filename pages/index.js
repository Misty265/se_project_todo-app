import {
  validationConfig,
  addTodoButton,
  addTodoCloseBtn,
  addTodoPopup,
  initialTodos,
  todoSubmitBtn,
  addTodoForm,
} from "../utils/constants.js";
import { Section } from "../utils/Section.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { PopupWithForm } from "../components/PopupWithForm.js";

const formValidator = new FormValidator(
  document.querySelector(validationConfig.formSelector),
  validationConfig,
  document.querySelectorAll(validationConfig.inputSelector),
  document.querySelector(validationConfig.inputSelector),
  document.querySelector(validationConfig.submitButtonSelector),
);

formValidator.enableValidation();

const todos = new Section({
  items: initialTodos,
  containerSelector: ".todos__list",
});

initialTodos.forEach((item) => {
  const todo = new Todo(item, "#todo-template");
  todos.addItem(todo.getView());
});

const todoPopup = new PopupWithForm(addTodoPopup, (value) => {
  const todo = new Todo(value, "#todo-template");
  todos.addItem(todo.getView());
  todos.renderItems();
  todoPopup._handleFormSubmit(value);
});

todoPopup.setEventListeners();
addTodoButton.addEventListener("click", () => {
  todoPopup.open();
  formValidator.resetValidation();
});
addTodoCloseBtn.addEventListener("click", () => {
  todoPopup.close();
  formValidator.resetValidation();
});
