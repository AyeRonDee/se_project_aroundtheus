import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

function escapeHandler(evt) {
  if (evt.key === "Escape") {
    closeAllModals();
  }
}

function clickHandler(evt) {
  if (evt.target.classList.contains("modal")) {
    closeAllModals();
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeHandler);
  document.removeEventListener("click", clickHandler);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeHandler);
  document.addEventListener("click", clickHandler);
}

function closeAllModals() {
  allModals.forEach((modal) => {
    closeModal(modal);
  });
}

function handleImageClick(card) {
  imageElement.src = card.link;
  imageElement.alt = card.name;
  imageCaption.textContent = card.name;
  openModal(imageModal);
}

function createCard(cardData) {
  const newCard = new Card(cardData, ".card__template", handleImageClick);
  return newCard.getView();
}

profileEditBtn.addEventListener("click", function () {
  modalTitleInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditModalCloseBtn.addEventListener("click", function () {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeModal(profileEditModal);
});

addNewCardBtn.addEventListener("click", function () {
  console.log(addNewCardSubmitBtn.disabled);
  openModal(addNewCardModal);
});

addNewCardCloseBtn.addEventListener("click", function () {
  closeModal(addNewCardModal);
});

addNewCardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = createCard({ name, link });
  cardListElement.prepend(cardElement);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  addNewCardSubmitBtn.disabled = true;
  addNewCardSubmitBtn.classList.add("modal__button_disabled");
  closeModal(addNewCardModal);
});

imageModalCloseBtn.addEventListener("click", function () {
  closeModal(imageModal);
});

initialCards.forEach(function (cardData) {
  const card = createCard(cardData);
  cardListElement.append(card);
});
