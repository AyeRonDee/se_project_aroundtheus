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
const addNewCardForm = addNewCardModal.querySelector(".modal__add-form");
const cardTitleInput = addNewCardModal.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addNewCardModal.querySelector(".modal__input_type_url");
const imageModal = document.querySelector(".modal-image");
const imageModalCloseBtn = imageModal.querySelector(".modal__close");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function hideOverlay() {
  modals = Array.from(document.querySelectorAll(".modal"));

  modals.forEach((modal) => {
    closeModal(modal);
  });
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__trash-button");
  const imageElement = imageModal.querySelector(".modal__image_element");
  const imageCaption = imageModal.querySelector(".modal__image_title");

  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("card__like-button_active");
  });

  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", function () {
    imageElement.src = data.link;
    imageElement.alt = data.name;
    imageCaption.textContent = data.name;

    openModal(imageModal);
  });

  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  return cardElement;
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
  openModal(addNewCardModal);
});

addNewCardCloseBtn.addEventListener("click", function () {
  closeModal(addNewCardModal);
});

addNewCardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListElement.prepend(cardElement);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  closeModal(addNewCardModal);
});

imageModalCloseBtn.addEventListener("click", function () {
  closeModal(imageModal);
});

initialCards.forEach(function (cardData) {
  cardListElement.append(getCardElement(cardData));
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    hideOverlay();
  }
});

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("modal")) {
    hideOverlay();
  }
});
