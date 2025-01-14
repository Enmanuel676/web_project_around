export class FormValidator {
  constructor(settings) {
    this.settings = settings;
  }

  showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.settings.errorClass);
  }

  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.settings.inputErrorClass);
    errorElement.classList.remove(this.settings.errorClass);
    errorElement.textContent = "";
  }

  checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this.hideInputError(formElement, inputElement);
    }
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this.settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      this.settings.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(formElement, inputElement);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(this.settings.formSelector)
    );

    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });

      this.setEventListeners(formElement);
    });
  }
}
