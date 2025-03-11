const popup = document.querySelectorAll(".popup");
//Initial Code Profile
const edit = document.querySelector(".profile__info-link");
const pageEdit = document.querySelector("#edit");
const exit = document.querySelectorAll(".popup__exit");
//intial Code Cards
const addCard = document.querySelector(".profile__info_add");
const pageCards = document.querySelector("#card");
const cardsForm = document.querySelector("#cards");
const cardImage = document.querySelector(".grid__image");
const imageCard = document.querySelector("#image-card");
const imageClose = document.querySelector(".image__close");
const imageName = document.querySelector(".image__name");
const imageShow = document.querySelector(".image__show");
export class Card {
  constructor(handleCardClick) {
    this.handleCardClick = handleCardClick;
    this.PopupWithImage = new PopupWithImage();
    this.cardImage = document.querySelector(".grid__image");
    this.imageClose = document.querySelector(".image__close");
    this.imageCard = document.querySelector("#image-card");
    this.title = "";
    this.link = "";
    this.setEventListeners();
  }
  setEventListeners() {
    this.cardImage.addEventListener("click", (event) => {
      const card = event.target.closest(".grid__card");
      if (card) {
        const title = card.querySelector(".grid__name").textContent;
        const link = event.target.src;
        this.title = title;
        this.link = link;
        this.PopupWithImage.open(title, link);
      }
    });
    this.imageClose.addEventListener("click", () => {
      this.PopupWithImage.close();
    });
    this.imageCard.addEventListener("dblclick", () => {
      this.PopupWithImage.close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.PopupWithImage.close();
      }
    });
  }
}
export class Popup {
  constructor(popup) {
    this.popup = popup;
    this.edit = document.querySelector("#edit");
    this.form = document.querySelector("#card");
  }
  open() {
    this._openEdit();
    this._openForm();
  }
  _openEdit() {
    this.edit.classList.remove("popup");
    this.edit.classList.add("popup__close");
  }
  _openForm() {
    this.form.classList.remove("popup");
    this.form.classList.add("popup__close");
  }

  close() {
    this._closeEdit();
    this._closeForm();
  }
  _closeEdit() {
    this.edit.classList.remove("popup__close");
    this.edit.classList.add("popup");
  }
  _closeForm() {
    this.form.classList.remove("popup__close");
    this.form.classList.add("popup");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleEnterClose(evt) {
    if (evt.key === "Enter") {
      this.close();
    }
  }

  setEventListeners() {
    edit.addEventListener("click", this._openEdit.bind(this));
    addCard.addEventListener("click", this._openForm.bind(this));
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    document.addEventListener("keydown", this._handleEnterClose.bind(this));
    exit.forEach((exit) => {
      exit.addEventListener("click", this.close.bind(this));
    });
    popup.forEach((popup) => {
      popup.addEventListener("dblclick", this.close.bind(this));
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this.imageCard = document.querySelector("#image-card");
    this.imageShow = document.querySelector(".image__show");
    this.imageName = document.querySelector(".image__name");
  }
  open(title, link) {
    this.imageCard.classList.remove("image__card");
    this.imageCard.classList.add("image__card_hidden");
    this.imageName.textContent = title;
    this.imageShow.src = link;
    this.imageShow.alt = title;
  }
  close() {
    this.imageCard.classList.remove("image__card_hidden");
    this.imageCard.classList.add("image__card");
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
    popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.submitForm(this._getInputValues());
    });
  }
  close() {
    super.close();
    popup.querySelector(".popup__form").reset();
  }
}
