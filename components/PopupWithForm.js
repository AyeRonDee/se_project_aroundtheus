import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupSelector = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  _getInputValues() {
    return this._popupSelector === ".modal-add"
      ? {
          title: this._popupForm.querySelector(".modal__input_type_title")
            .value,
          url: this._popupForm.querySelector(".modal__input_type_url").value,
        }
      : {
          name: this._popupForm.querySelector(".modal__form-title").value,
          description: this._popupForm.querySelector(".modal__form-description")
            .value,
        };
  }

  close() {
    // document.removeEventListener("keydown", super._handleEscClose);
    // document.removeEventListener("click", super._clickHandler);
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
