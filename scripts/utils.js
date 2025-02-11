const popup = document.querySelector(".popup");
//Initial Code Profile
const edit = document.querySelector(".profile__info-link");
const pageEdit = document.querySelector("#edit");
const exit = document.querySelectorAll(".popup__exit");
//intial Code Cards
const addCard = document.querySelector(".profile__info_add");
const pageCards = document.querySelector("#card");
const cardsForm = document.querySelector("#cards");
export class Card {
  constructor(imageCard, imageName, imageShow) {
    this.openEditPopup = this.openEditPopup.bind(this);
    this.openCardsPopup = this.openCardsPopup.bind(this);
    this.closePopups = this.closePopups.bind(this);
    this._escapeKey = this._escapeKey.bind(this);
    this.enterKey = this.enterKey.bind(this);
    this._eventListeners = this.eventListeners.bind(this);
    this.imageCard = document.querySelector("#image-card");
    this.imageName = document.querySelector(".image__name");
    this.imageShow = document.querySelector(".image__show");
  }
  openEditPopup() {
    pageEdit.classList.remove("popup");
    pageEdit.classList.add("popup__close");
  }
  openCardsPopup() {
    pageCards.classList.remove("popup");
    pageCards.classList.add("popup__close");
  }

  closePopups() {
    pageEdit.classList.remove("popup__close");
    pageEdit.classList.add("popup");
    pageCards.classList.remove("popup__close");
    pageCards.classList.add("popup");
  }
  _escapeKey(evt) {
    if (evt.key === "Escape") {
      this.closePopups();
    }
  }
  enterKey(evt) {
    if (evt.key === "Enter") {
      this.closePopups();
    }
  }

  eventListeners() {
    addCard.addEventListener("click", this.openCardsPopup);
    edit.addEventListener("click", this.openEditPopup);

    document.addEventListener("keydown", this._escapeKey);
    cardsForm.addEventListener("submit", this.closePopups);
    exit.forEach((exit) => {
      exit.addEventListener("click", this.closePopups);
    });

    popup.addEventListener("dblclick", this.closePopups);
  }
  openImage(title, link) {
    this.imageCard.classList.remove("image__card");
    this.imageCard.classList.add("image__card_hidden");
    this.imageName.textContent = title;
    this.imageShow.src = link;
    this.imageShow.alt = title;
  }
  closeImage() {
    this.imageCard.classList.add("image__card");
  }
}

class Popup {
  constructor(popup) {
    this.popup = popup;
  }
  open() {
    this.popup.classList.remove("popup");
    this.popup.classList.add("popup__close");
  }
  close() {
    this.popup.classList.remove("popup__close");
    this.popup.classList.add("popup");
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this.popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}
class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }
  open(title, link) {
    super.open();
    this.popup.querySelector(".image__name").textContent = title;
    this.popup.querySelector(".image__show").src = link;
    this.popup.querySelector(".image__show").alt = title;
  }
}

class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup);
    this.submitForm = submitForm;
  }
  _getInputValues() {
    const inputList = this.popup.querySelectorAll(".popup__input");
    const formValues = {};
    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.submitForm(this._getInputValues());
    });
  }
  close() {
    super.close();
    this.popup.querySelector(".popup__form").reset();
  }
}
