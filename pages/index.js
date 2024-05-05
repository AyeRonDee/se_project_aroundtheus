import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal-edit");
const profileEditModalCloseBtn =
  profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const allModals = Array.from(document.querySelectorAll(".modal"));
const modalTitleInput = document.querySelector(".modal__form-title");
const modalDescriptionInput = document.querySelector(
  ".modal__form-description"
);
const profileEditForm = profileEditModal.querySelector(".modal__profile-form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector(".card__template").content.firstElementChild;
const addNewCardModal = document.querySelector(".modal-add");
const addNewCardBtn = document.querySelector(".profile__add-button");
const addNewCardCloseBtn = addNewCardModal.querySelector(".modal__close");
const addNewCardSubmitBtn = addNewCardModal.querySelector(
  ".modal__add-submit-btn"
);
const addNewCardForm = addNewCardModal.querySelector(".modal__add-form");
const cardTitleInput = addNewCardModal.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addNewCardModal.querySelector(".modal__input_type_url");
const imageModal = document.querySelector(".modal-image");
const imageModalCloseBtn = imageModal.querySelector(".modal__close");
const imageElement = imageModal.querySelector(".modal__image_element");
const imageCaption = imageModal.querySelector(".modal__image_title");

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const addFormValidator = new FormValidator(validationSettings, addNewCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardsList.addItem(card);
    },
  },
  ".cards__list"
);

// ***** USERINFO TEST START *****

const userInformation = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});

// const userFormValues = new UserInfo({
//   name: ".modal__form-title",
//   description: ".modal__form-description",
// });

// ***** USERINFO TEST END *****

const editModal = new PopupWithForm({
  popupSelector: ".modal-edit",
  handleFormSubmit: (data) => {
    userInformation.setUserInfo(data);
    editModal.close();
  },
});
editModal.setEventListeners();

const addCardModal = new PopupWithForm({
  popupSelector: ".modal-add",
  handleFormSubmit: (data) => {
    const name = data.title;
    const link = data.url;
    const card = createCard({ name, link });
    cardsList.prepend(card);
  },
});
addCardModal.setEventListeners();

const imagePreviewModal = new PopupWithImage({
  popupSelector: ".modal-image",
});

function handleImageClick(card) {
  imagePreviewModal.open(card);
}

function createCard(cardData) {
  const newCard = new Card(cardData, ".card__template", handleImageClick);
  return newCard.getView();
}

profileEditBtn.addEventListener("click", () => {
  const userInfo = userInformation.getUserInfo();
  // const { name, description } = userInformation.getUserInfo()
  modalTitleInput.value = userInfo.name;
  modalDescriptionInput.value = userInfo.description;
  editModal.open();
});

addNewCardBtn.addEventListener("click", function () {
  addCardModal.open();
});

cardsList.renderItems();

// function escapeHandler(evt) {
//   if (evt.key === "Escape") {
//     closeAllModals();
//   }
// }

// function clickHandler(evt) {
//   if (evt.target.classList.contains("modal")) {
//     closeAllModals();
//   }
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", escapeHandler);
//   document.removeEventListener("click", clickHandler);
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", escapeHandler);
//   document.addEventListener("click", clickHandler);
// }

// function closeAllModals() {
//   allModals.forEach((modal) => {
//     closeModal(modal);
//   });
// }

// profileEditBtn.addEventListener("click", function () {
//   modalTitleInput.value = profileTitle.textContent;
//   modalDescriptionInput.value = profileDescription.textContent;
//   openModal(profileEditModal);
// });

// profileEditModalCloseBtn.addEventListener("click", function () {
//   closeModal(profileEditModal);
// });
// addNewCardBtn.addEventListener("click", function () {
//   openModal(addNewCardModal);
// });

// addNewCardCloseBtn.addEventListener("click", function () {
//   closeModal(addNewCardModal);
// });
// imageModalCloseBtn.addEventListener("click", function () {
//   closeModal(imageModal);
// });

// profileEditForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   profileTitle.textContent = modalTitleInput.value;
//   profileDescription.textContent = modalDescriptionInput.value;
//   closeModal(profileEditModal);
// });

// addNewCardForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   const cardElement = createCard({ name, link });
//   cardListElement.prepend(cardElement);
//   addFormValidator.resetForm();
//   closeModal(addNewCardModal);
// });
