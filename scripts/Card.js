//Create Cards
const cardsForm = document.querySelector("#cards");
const cardsTitle = document.querySelector("#title");
const cardsLink = document.querySelector("#url");
const grid = document.querySelector(".grid");
const template = document.querySelector("#template").content;
const gridCard = template.querySelector(".grid__card").cloneNode(true);
import { Card } from "./utils.js";
const popup = new Card();

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
  }
  create() {
    this.cardTitle.textContent = this.title;
    this.cardImage.src = this.link;
    this.cardImage.alt = this.title;
    grid.append(this.gridCard);
    return this.gridCard;
  }

  eventListeners() {
    this.cardLike.addEventListener("click", () => {
      this.cardLike.classList.toggle("grid__like_active");
    });
    this.cardImage.addEventListener("click", () => {
      popup.openImage(this.title, this.link);
    });
    this.imageClose.addEventListener("click", () => {
      popup.closeImage();
    });
    this.imageCard.addEventListener("dblclick", () => {
      popup.closeImage();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        popup.closeImage();
      }
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
    cardManager.eventListeners();
    grid.prepend(newCard);
  }
  eventListener() {
    cardsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.generateCards();
    });
  }
}
