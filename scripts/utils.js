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
    this.setEventListeners();
  }
  setEventListeners() {
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
  }
  open(title, link) {
    imageCard.classList.remove("image__card");
    imageCard.classList.add("image__card_hidden");
    imageName.textContent = title;
    imageShow.src = link;
    imageShow.alt = title;
  }
  close() {
    imageCard.classList.add("image__card");
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
