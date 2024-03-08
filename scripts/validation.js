const showInputError = (formEl, inputEl, options) => {
  errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(options.inputErrorClass);
  errorElement.textContent = inputEl.validationMessage;
  errorElement.classList.add(options.errorClass);
};
const hideInputError = (formEl, inputEl, options) => {
  errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(options.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(options.errorClass);
};

const checkInputValidity = (formEl, inputEl, options) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
};

const toggleButtonState = (inputEls, submitButton, options) => {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
    if (foundInvalid) {
      submitButton.classList.add(options.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(options.inactiveButtonClass);
      submitButton.disabled = false;
    }
  });
};

const setEventListeners = (formEl, options) => {
  const { inputSelector } = options;
  const inputElements = Array.from(formEl.querySelectorAll(inputSelector));
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
};

const enableValidation = (options) => {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formEl, options);
  });
};

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
