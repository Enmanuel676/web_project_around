let pageEdit = document.querySelector("#edit");
let editSave = document.querySelector("#button");
let initialCards = [
  {
    title: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    title: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    title: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    title: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];
console.log(initialCards);

// Disabled Button
let nombre = document.querySelector("#name");
let descripcion = document.querySelector("#description");

//Fuction
editSave.disabled = false;
function disabledName() {
  if (nombre.value === "Jacques Cousteau") {
    editSave.disabled = false;
    editSave.className = "popup__button";
  } else {
    editSave.disabled = true;
    editSave.className = "popup__button_disabled";
  }
}

function disabledDescription() {
  if (descripcion.value === "") {
    editSave.disabled = true;
    editSave.className = "popup__button";
  } else {
    editSave.disabled = false;
    editSave.className = "popup__button_disabled";
  }
}
nombre.addEventListener("keyup", disabledName);
descripcion.addEventListener("keyup", disabledDescription);

// Variables globales
const cardsForm = document.querySelector("#cards");
const cardsTitle = document.querySelector("#title");
const cardsLink = document.querySelector("#url");
const cardSave = document.querySelector("#save");

// Función para habilitar/deshabilitar el botón de guardar
function saveDisabled() {
  if (cardsTitle.value === "" || cardsLink.value === "") {
    cardSave.disabled = true;
    cardSave.className = "popup__button";
  } else {
    cardSave.disabled = false;
    cardSave.className = "popup__button_disabled";
  }
}

// Eventos para validar el formulario
cardsTitle.addEventListener("input", saveDisabled);
cardsLink.addEventListener("input", saveDisabled);

// Inicialmente deshabilitar el botón si el formulario no es válido
saveDisabled();

//utils.js
import {
  Card,
  Popup,
  PopupWithImage,
  PopupWithForm,
  Section,
  UserInfo,
} from "./utils.js";

const popup = new Popup();
popup.setEventListeners();

//API
import Api from "./Api.js";
import { PopupWithConfirmation } from "./Api.js";
const api = new Api({
  urls: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "af85156e-e899-4a77-86d2-22db6a5b187f",
    "Content-Type": "application/json",
  },
});
const popupWithConfirmation = new PopupWithConfirmation();
api.getInitialUser();
api.getInitialCards();

//Profile Info
pageEdit.addEventListener("submit", function (f) {
  f.preventDefault();
  let name = document.querySelector("#name").value;
  let about = document.querySelector("#description").value;
  api.setProfileInfo(name, about);
  const save = document.querySelector(".popup__button_disabled");
  save.textContent = "Guardando...";
});

pageEdit.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    api.setProfileInfo(evt);
  }
});
//Edit Avatar
const avatar = document.querySelector(".profile__avatar");
const avatarExitPopup = document.querySelector(".popup__exit_edit-avatar");
const avatarPopup = document.querySelector(".edit__avatar-hidden");
const avatarForm = document.querySelector(".edit__avatar-form");

avatar.addEventListener("click", () => {
  avatarPopup.classList.remove("edit__avatar-hidden");
  avatarPopup.classList.add("edit__avatar");
});
avatarExitPopup.addEventListener("click", () => {
  avatarPopup.classList.remove("edit__avatar");
  avatarPopup.classList.add("edit__avatar-hidden");
});

avatarForm.addEventListener("submit", (a) => {
  a.preventDefault();
  const avatarInput = document.querySelector("#avatar").value;
  api.changeAvatar(avatarInput);
});

//Cards Form for Generate Cards
const cardForm = document.querySelector("#card");
cardForm.addEventListener("submit", function (c) {
  let name = document.querySelector("#title").value;
  let link = document.querySelector("#url").value;
  api.setCards(name, link);
  const savingCard = document.querySelector("#save");
  savingCard.textContent = "Creando...";
});
cardForm.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    api.setCards(evt);
  }
});

//Delete Cards
const popupConfirmation = new PopupWithConfirmation();
const form = document.querySelector(".card__eliminate-form");
const grid = document.querySelector(".grid");
const exit = document.querySelector(".popup__exit-eliminate");
grid.addEventListener("click", () => {
  popupConfirmation.getAttributes();
});
exit.addEventListener("click", () => {
  popupConfirmation.close();
});
popupConfirmation.getAttributes();
form.addEventListener("submit", (event) => {
  event.preventDefault();
  api.deleteCards(form.id);
});

const imageCard = document.querySelector("#image-card");
const imageClose = document.querySelector(".image__close");

imageClose.addEventListener("click", () => {
  imageCard.classList.remove("image__card_hidden");
  imageCard.classList.add("image__card");
});

imageCard.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("image__card_hidden")) {
    imageCard.classList.remove("image__card_hidden");
    imageCard.classList.add("image__card");
  }
});

//Like and Dislike
grid.addEventListener("click", (event) => {
  if (event.target.classList.contains("grid__like")) {
    const likeButton = event.target;
    const cardElement = likeButton.closest(".grid__card");
    const cardId = cardElement.id;
    const isLiked = likeButton.classList.contains("grid__like_active");

    api
      .like(cardId, isLiked)
      .then((updatedCard) => {
        // La API devuelve el estado de 'isLiked' directamente
        if (updatedCard.isLiked) {
          likeButton.classList.add("grid__like_active");
        } else {
          likeButton.classList.remove("grid__like_active");
        }

        // Actualizar el contador de likes si existe
        const likeCount = cardElement.querySelector(".grid__like-count");
        if (likeCount) {
          // Asegurarse de que updatedCard.likes existe antes de acceder a su longitud
          likeCount.textContent = updatedCard.likes
            ? updatedCard.likes.length
            : 0;
        }
      })
      .catch((err) => console.log(err)); // Añadir un catch para errores
  }
});
//FormValidator.js
import { FormValidator } from "./FormValidator.js";
const validator = new FormValidator({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
validator.enableValidation();
