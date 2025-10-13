import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";

const formValidator = new FormValidator(
  document.querySelector(validationConfig.formSelector),
  validationConfig,
  document.querySelectorAll(validationConfig.inputSelector),
  document.querySelector(validationConfig.inputSelector)
);
formValidator.enableValidation();
formValidator._setEventListeners(validationConfig.inputSelector);
formValidator.disableSubmitButton(); // Disable button on load
formValidator.resetForm(); // Reset form on load
formValidator._toggleButtonState(
  document.querySelectorAll(validationConfig.inputSelector),
  document.querySelector(validationConfig.submitButtonSelector)
);
formValidator.checkValidity();

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
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date };
  const todo = new Todo(values).getView();
  todosList.append(todo);
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = new Todo(item).getView();
  todosList.append(todo);
});

formValidator.enableValidation(validationConfig); // Enable form validation on page load
