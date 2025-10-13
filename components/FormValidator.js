export class FormValidator {
  constructor(form, settings, inputList, inputElement, submitButton) {
    this._settings = settings;
    this._form = form || document.querySelector(this._settings.formSelector);
    this._inputList =
      inputList ||
      Array.from(this._form.querySelectorAll(this._settings.inputSelector));

    this._inputElement =
      inputElement || this._form.querySelector(this._settings.inputSelector);
    this._form.noValidate = true; // Disable native validation
    this._submitButton =
      submitButton ||
      this._form.querySelector(this._settings.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
    this.checkValidity(this._inputElement);

    return this;
  }

  _setEventListeners() {
    const inputList = this._inputList;
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._validateInput(inputElement);
        this._toggleButtonState();
      });
      inputElement.addEventListener("blur", () => {
        this._validateInput(inputElement);
        this._toggleButtonState();
      });
    });
    return this;
  }

  _toggleButtonState() {
    const buttonElement = this._submitButton;
    if (this._form.checkValidity()) {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.disabled = true;
    }
    return this;
  }

  showInputError(inputElement) {
    const errorElementID = `${inputElement.id}-error`;
    const errorElement = this._form.querySelector(`#${errorElementID}`);

    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);

    this._toggleButtonState();

    return this;
  }

  hideInputError(inputElement) {
    const errorElementID = `${inputElement.id}-error`;
    const errorElement = this._form.querySelector(`#${errorElementID}`);

    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";

    this._toggleButtonState();

    return this;
  }

  resetValidation() {
    this._form.reset();
    const inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
    this._toggleButtonState();
    return this;
  }

  _validateInput(inputElement) {
    if (!inputElement) return;
    this.checkValidity(inputElement);
    return this;
  }

  checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement);
      return false;
    } else {
      this.hideInputError(inputElement);
      return true;
    }
  }
}
