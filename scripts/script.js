const title = document.querySelector(".edit__profile_title");
const imageCard = document.querySelector("#image-card");
const imageShow = document.querySelector(".image__show");
const imageName = document.querySelector(".image__name");
const exit = document.querySelectorAll(".popup__exit");
const main = document.querySelector(".main");

let pageEdit = document.querySelector("#edit");
let editSave = document.querySelector("#button");
const initialCards = [
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

//Fuction
function submitForm(a) {
  a.preventDefault();
  const names = document.querySelector(".profile__info-name");
  const description = document.querySelector(".profile__info-description");
  var nombre = document.querySelector("#name").value;
  var descripcion = document.querySelector("#description").value;
  names.textContent = `${nombre[0].toUpperCase() + nombre.slice(1)}`;
  description.textContent = `${
    descripcion[0].toUpperCase() + descripcion.slice(1)
  }`;
  pageEdit.classList.remove("popup__close");
  pageEdit.classList.add("popup");
}
pageEdit.addEventListener("submit", submitForm);

// Disabled Button
let nombre = document.querySelector("#name");
let descripcion = document.querySelector("#description");

//Fuction
editSave.disabled = true;
function disabledName() {
  if (nombre.value === "") {
    editSave.disabled = true;
    editSave.className = "popup__button";
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

//Import and implement the classes in the script.js file

//utils.js
import { Card } from "./utils.js";
const popups = new Card();
popups._eventListeners();

//Card.js
import { CardManager, CardGenerator } from "./Card.js";
const card = new CardManager();
card.deleteCards();
const generateCards = new CardGenerator();
generateCards.eventListener();
initialCards.forEach((element) => {
  const card = new CardManager(element.title, element.link);
  card.create();
  card.eventListeners();
});

card.eventListeners();

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
