//This class will need to override the parent’s open() method.
//The open() method of the PopupWithImage class will need to accept the name and link of
//the card as arguments and add an image to the popup and the corresponding image src attribute along with a caption for the image.
//This method should be called in your image click handler in index.js.

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__image_element");
    this._caption = this._popupElement.querySelector(".modal__image_title");
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}

//Create one instance of this class in index.js and call its parent’s setEventListeners() method.
