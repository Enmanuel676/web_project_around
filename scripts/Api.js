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
      .then((datas) => {
        infoName.textContent = datas.name;
        infoDesc.textContent = datas.about;
        infoAvatar.alt = datas.name;
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
        let prueba = data;
        console.log(prueba);
        const card = new CardManager();
        prueba.forEach((element) => {
          const card = new CardManager(element.name, element.link);
          card.create();
        });
        card.eventListeners();
      });
  }
}

export default Api;
