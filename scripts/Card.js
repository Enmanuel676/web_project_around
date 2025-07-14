//Create Cards
const cardsForm = document.querySelector("#cards");
const cardsTitle = document.querySelector("#title");
const cardsLink = document.querySelector("#url");
const grid = document.querySelector(".grid");
const template = document.querySelector("#template").content;
const gridCard = template.querySelector(".grid__card").cloneNode(true);
import { Popup, PopupWithImage } from "./utils.js";

const popup = new Popup();

export class CardManager {
  constructor(name, link, id, isLiked) {
    this.name = name;
    this.link = link;
    this._id = id;
    this.isLiked = isLiked;
    this.gridCard = template.querySelector(".grid__card").cloneNode(true);
    this.cardTitle = this.gridCard.querySelector(".grid__name");
    this.cardImage = this.gridCard.querySelector(".grid__image");
    this.cardLike = this.gridCard.querySelector(".grid__like");
    this.imageClose = document.querySelector(".image__close");
    this.imageCard = document.querySelector("#image-card");
    this.PopupWithImage = new PopupWithImage();
  }
  create() {
    this.cardLike.setAttribute("isLiked", this.isLiked);
    this.gridCard.setAttribute("id", this._id);
    this.cardTitle.textContent = this.name;
    this.cardImage.src = this.link;
    this.cardImage.alt = this.name;
    this.setEventListeners();
    grid.append(this.gridCard);
    return this.gridCard, console.log(this.gridCard);
  }

  setEventListeners() {
    this.cardImage.addEventListener("click", () => {
      this.PopupWithImage.open(this.name, this.link);
    });

    this.cardLike.addEventListener("click", () => {
      this.cardLike.classList.toggle("grid__like_active");
    });
  }

  eventListeners() {
    this.cardLike.addEventListener("click", () => {
      this.cardLike.classList.toggle("grid__like_active");
    });
  }

  deleteCards() {
    grid.addEventListener("click", (event) => {
      if (event.target.classList.contains("card__delete")) {
        const card = event.target.closest(".grid__card");
        card.remove();
      }
    });
  }
}
2;
//Add Cards
export class CardGenerator extends CardManager {
  generateCards() {
    const title = cardsTitle.value;
    const link = cardsLink.value;
    const cardManager = new CardManager(title, link);
    const newCard = cardManager.create();
    grid.prepend(newCard);
  }
  eventListener() {
    // Comentamos este event listener para evitar conflictos con PopupWithForm
    // cardsForm.addEventListener("submit", (event) => {
    //   event.preventDefault();
    //   this.generateCards();
    //   cardsTitle.value = "";
    //   cardsLink.value = "";
    // });
  }
}
