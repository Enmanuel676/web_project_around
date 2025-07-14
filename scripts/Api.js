//Initial Code
const infoName = document.querySelector(".profile__info-name");
const infoDesc = document.querySelector(".profile__info-description");
const infoAvatar = document.querySelector(".profile__avatar");
const infoNameValue = document.querySelector("#name");
const infoDescValue = document.querySelector("#description");
import { CardManager } from "./Card.js";
import { Popup, PopupWithForm } from "./utils.js";

class Api {
  constructor(options) {
    this.urls = options.urls;
    this.headers = options.headers;
  }
  _response() {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error, ${res.status}`);
  }
  getInitialUser() {
    return fetch(`${this.urls}/users/me/`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        infoName.textContent = data.name;
        infoNameValue.value = data.name;
        infoDesc.textContent = data.about;
        infoDescValue.value = data.about;
        infoAvatar.src = data.avatar;
        infoAvatar.alt = data.name;
      });
  }
  setProfileInfo(name, about) {
    fetch(`${this.urls}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        this.getInitialUser();
      });
  }
  getInitialCards() {
    return fetch(`${this.urls}/cards/`, {
      headers: this.headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let cards = data;

        const card = new CardManager();
        cards.forEach((element) => {
          const card = new CardManager(
            element.name,
            element.link,
            element._id,
            element.isLiked
          );
          card.create();
        });
        card.eventListeners();
        console.log(data);
      });
  }
  setCards(name, link) {
    fetch(`${this.urls}/cards/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then(() => {
        setTimeout(location.reload(), 5000);
        const saveButton = document.querySelector(".popup__button");
        saveButton.textContent = "Guardando...";
      });
  }
  deleteCards(id) {
    fetch(`${this.urls}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setTimeout(location.reload(), 3000);
      });
  }
  likeCard(id) {
    fetch(`${this.urls}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((resp) => resp.json())
      .then((likes) => {});
  }
}

export class PopupWithConfirmation {
  constructor() {
    this.form = document.querySelector(".card__eliminate-form");
    this.grid = document.querySelector(".grid");
    this.popup = document.querySelector(".card__eliminate-hidden");
    this.exit = document.querySelector(".popup__exit-eliminate");
  }
  getAttributes() {
    this.grid.addEventListener("click", (event) => {
      if (event.target.classList.contains("card__delete")) {
        const card = event.target.closest(".grid__card");
        this.form.setAttribute("id", card.id);
        console.log(card.id);
        this.open();
        console.log(card.id);
      }
    });
  }
  open() {
    this.popup.classList.remove("card__eliminate-hidden");
    this.popup.classList.add("card__eliminate");
  }
  close() {
    this.popup.classList.remove("card__eliminate");
    this.popup.classList.add("card__eliminate-hidden");
  }
}

export default Api;
