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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        this.userId = data._id; // Guardar el ID del usuario
        infoName.textContent = data.name;
        infoNameValue.value = data.name;
        infoDesc.textContent = data.about;
        infoDescValue.value = data.about;
        infoAvatar.src = data.avatar;
        infoAvatar.alt = data.name;
        return data, console.log(data); // Devolver los datos para poder usarlos después
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
        const popup = new Popup();
        popup.close();
        this.getInitialUser();
        const save = document.querySelector(".popup__button_disabled");
        save.textContent = "Guardar";
      });
  }
  changeAvatar(avatar) {
    fetch(`${this.urls}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((resp) => resp.json)
      .then((data) => {
        setTimeout(location.reload(), 3000);
        const avatarInput = document.querySelector("#avatar");
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
        setTimeout(location.reload(), 3000);
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
  like(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this.urls}/cards/${id}/likes`, {
      method: method,
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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
        this.open();
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
