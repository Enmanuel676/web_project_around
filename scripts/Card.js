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
  constructor(title, link) {
    this.title = title;
    this.link = link;
    this.gridCard = template.querySelector(".grid__card").cloneNode(true);
    this.cardTitle = this.gridCard.querySelector(".grid__name");
    this.cardImage = this.gridCard.querySelector(".grid__image");
    this.cardLike = this.gridCard.querySelector(".grid__like");
    this.imageClose = document.querySelector(".image__close");
    this.imageCard = document.querySelector("#image-card");
    this.PopupWithImage = new PopupWithImage();
  }
  create() {
    this.cardTitle.textContent = this.title;
    this.cardImage.src = this.link;
    this.cardImage.alt = this.title;
    this.setEventListeners();
    grid.append(this.gridCard);
    return this.gridCard;
  }

  setEventListeners() {
    this.cardImage.addEventListener("click", () => {
      this.PopupWithImage.open(this.title, this.link);
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
    cardsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.generateCards();
      cardsTitle.value = "";
      cardsLink.value = "";
    });
  }
}
