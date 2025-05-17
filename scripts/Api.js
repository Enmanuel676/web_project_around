//Initial Code
const infoName = document.querySelector(".profile__info-name");
const infoDesc = document.querySelector(".profile__info-description");
const infoAvatar = document.querySelector(".profile__avatar");

export class Api {
  constructor(name, about, avatar, link) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this.link = link;
  }
  getUserInfo() {
    fetch("https://around-api.es.tripleten-services.com/v1/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "af85156e-e899-4a77-86d2-22db6a5b187f",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar:
          "https://raw.githubusercontent.com/Enmanuel676/web_project_around/refs/heads/main/images/profile-avatar.png",
      }),
      //Avtar fixed
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        infoAvatar.src = data.avatar;
        infoName.textContent = data.name;
        infoDesc.textContent = data.about;
      });
  }

  getInitialCards() {
    fetch(
      "https://around-api.es.tripleten-services.com/v1/cards/6827e8d8a533c2001afa2cba",
      {
        method: "DELETE",
        headers: {
          authorization: "af85156e-e899-4a77-86d2-22db6a5b187f",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
          name: "Lago di Braies",
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
}
