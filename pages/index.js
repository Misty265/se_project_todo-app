import {
  validationConfig,
  addTodoButton,
  addTodoCloseBtn,
  addTodoPopup,
  initialTodos,
  todoSubmitBtn,
  addTodoForm,
  checkbox,
} from "../utils/constants.js";
import { Section } from "../utils/Section.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { TodoCounter } from "../components/TodoCounter.js";

const formValidator = new FormValidator(
  document.querySelector(validationConfig.formSelector),
  validationConfig,
  document.querySelectorAll(validationConfig.inputSelector),
  document.querySelector(validationConfig.inputSelector),
  document.querySelector(validationConfig.submitButtonSelector),
);

formValidator.enableValidation();

const todos = new Section({
  items: [],
  containerSelector: ".todos__list",
});

const updateValues = new TodoCounter(todos, ".counter__text");

initialTodos.forEach((item) => {
  const todo = new Todo(item, updateValues, "#todo-template");
  todos.addItem(todo.getView());
  if (item.completed) {
    updateValues.updateCompleted(true);
  } else {
  }
  updateValues.updateTotal(true);
});

const todoPopup = new PopupWithForm(addTodoPopup, (value) => {
  const todo = new Todo(value, updateValues, "#todo-template");
  todos.addItem(todo.getView());

  updateValues.updateTotal(true);
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
