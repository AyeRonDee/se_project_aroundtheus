export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._modalClosebtn = this._popupElement.querySelector(".modal__close");
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _clickHandler = (evt) => {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  };

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    // document.removeEventListener("keydown", this._handleEscClose);
    // document.removeEventListener("click", this._clickHandler);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._clickHandler);
    this._modalClosebtn.addEventListener("click", () => {
      this.close();
    });
  }
}
