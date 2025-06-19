const title = document.querySelector(".edit__profile_title");
const imageCard = document.querySelector("#image-card");
const imageShow = document.querySelector(".image__show");
const imageName = document.querySelector(".image__name");
const exit = document.querySelectorAll(".popup__exit");
const main = document.querySelector(".main");

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
pageEdit.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    submitForm(evt);
  }
});
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
const api = new Api({
  urls: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "af85156e-e899-4a77-86d2-22db6a5b187f",
    "Content-Type": "application/json",
  },
});

api.getInitialUser();
api.getInitialCards();

// Crear una instancia de UserInfo para manejar la información del usuario
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-description",
});

// Crear una instancia de Section para manejar las tarjetas
/*const cardSection = new Section(
  {
    items: initialCard,
    renderer: (item) => {
      const card = new CardManager(item.title, item.link);
      const cardElement = card.create();
      cardSection.addItem(cardElement);
    },
  },
  ".grid"
);/*

// Comentamos esta línea para evitar duplicar las tarjetas iniciales
// cardSection.renderItems();

// Crear instancias de PopupWithForm para cada popup con formulario
const editProfilePopup = new PopupWithForm(
  document.querySelector("#edit"),
  (formData) => {
    // Usar la clase UserInfo para actualizar la información del usuario
    userInfo.setUserInfo({
      name: formData.name[0].toUpperCase() + formData.name.slice(1),
      job:
        formData.description[0].toUpperCase() + formData.description.slice(1),
    });
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

// Rellenar el formulario con los datos actuales del usuario cuando se abre
document.querySelector(".profile__info-link").addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.querySelector("#name").value = userData.name;
  document.querySelector("#description").value = userData.job;
});

const addCardPopup = new PopupWithForm(
  document.querySelector("#card"),
  (formData) => {
    const card = new CardManager(formData.title, formData.url);
    const cardElement = card.create();
    cardSection.addItem(cardElement);
    addCardPopup.close();
    addCardPopup.close();
  }
);
addCardPopup.setEventListeners();

//Card.js
import { CardManager, CardGenerator } from "./Card.js";

// Configurar el manejo de clics en la imagen para cerrar el popup
const imageClose = document.querySelector(".image__close");

// Usar la variable imageCard ya declarada en la parte superior
imageClose.addEventListener("click", () => {
  imageCard.classList.remove("image__card_hidden");
  imageCard.classList.add("image__card");
});

// Cerrar con Escape
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    imageCard.classList.contains("image__card_hidden")
  ) {
    imageCard.classList.remove("image__card_hidden");
    imageCard.classList.add("image__card");
  }
});

// Cerrar con doble clic
imageCard.addEventListener("dblclick", () => {
  imageCard.classList.remove("image__card_hidden");
  imageCard.classList.add("image__card");
});

const card = new CardManager();
card.deleteCards();
const generateCards = new CardGenerator();
generateCards.eventListener();
/*initialCards.forEach((element) => {
  const card = new CardManager(element.title, element.link);
  card.create();
});

card.eventListeners();*/

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

fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
  headers: {
    authorization: "af85156e-e899-4a77-86d2-22db6a5b187f",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
