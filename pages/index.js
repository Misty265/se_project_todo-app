import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const formValidator = new FormValidator(
  document.querySelector(validationConfig.formSelector),
  validationConfig,
  document.querySelectorAll(validationConfig.inputSelector),
  document.querySelector(validationConfig.inputSelector),
  document.querySelector(validationConfig.submitButtonSelector)
);
formValidator.enableValidation();

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
  formValidator.toggleButtonState();
  formValidator.resetValidation();
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
  formValidator.resetValidation();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const values = { name, date, completed: false, id: uuidv4() };
  const todo = new Todo(values, validationConfig).getView();
  todosList.append(todo);
  closeModal(addTodoPopup);
  formValidator.resetValidation();
});

initialTodos.forEach((item) => {
  const todo = new Todo(item).getView();
  todosList.append(todo);
  formValidator.resetValidation();
});
