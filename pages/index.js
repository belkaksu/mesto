import { formParameters, FormValidator } from '../scripts/components/FormValidator.js';
import { initialCards } from '../scripts/utils/initial-cards.js';
import { Card } from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';

import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import './index.css';

import { cardsList, imagePopupSelector, profilePopupOpenButton, profilePopupSelector, profileFormElement, profileNameInput, profileJobInput, profileNameElement, profileJobElement, popupNewCardOpenButton, popupNewCardSelector, newCardFormElement, profileAvatarElement } from '../scripts/utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '82034b5c-94c4-471a-b185-eb63c714f946',
    'Content-Type': 'application/json'
  }
});


// Отрисовка массива карточек

const cardsContainer = new Section({
  renderer: (item) => {
    cardsContainer.addItem(createCard(item));
  }
}, cardsList);



const userInfo = new UserInfo(profileNameElement, profileJobElement, profileAvatarElement)

api.getInitialCards()
  .then((cardData) => {
    cardsContainer.renderItems(cardData)
  }).catch((err) => {
    console.log("Ошибка в получении массива карточек")
  })



api.getUserInfo()
  .then((data) => {
    const user = {
      userName: data.name,
      userJob: data.about,
      userAvatar: data.avatar
    }
    userInfo.setUserInfo(user.userName, user.userJob)
    userInfo.setUserAvatar(user.userAvatar)
  }).catch((err) => {
    console.log("Ошибка загрузки данных пользователя")
  })








// Создание карточки

function createCard(dataCard) {
  const card = new Card({
    data: dataCard,
    cardSelector: '#cards__template',
    handleCardClick: () => handleCardClick(evt)
  });
  return card.generateCard();
}

// Функция заполнения попапа данными и его открытия

function handleCardClick(evt) {
  const data = {};
  data.name = evt.target.alt;
  data.link = evt.target.src;
  imagePopup.open(data);
}



const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup.setEventListeners();


// addCardPopup
// Добавляем новую карточку на страницу

const addCardPopup = new PopupWithForm(popupNewCardSelector, (formData) => {
  const newCard = {
    name: formData.dataName,
    link: formData.dataLink
  }
    api.addCard(newCard)
    .then((cardData) => {
      cardsContainer.addItem(createCard(cardData));
      addCardPopup.close();
    }).catch((err) => {
      console.log("Ошибка загрузки карточки")
    })

});

addCardPopup.setEventListeners();

popupNewCardOpenButton.addEventListener('click', () => {

  addCardPopup.open();
  formValidatorNewCardForm.enableValidation();
});

// Отрисовка новой карточки

// function prependNewCardToCardsContainer(data) {
//   const newCard = {
//     name: data.dataName,
//     link: data.dataLink
//   }
// const newCard = new Card({
//   link: link,
//   name: name
// }, '#cards__template', () => handleCardClick(link, name));
// const newCardElement = newCard.generateCard();
// cardContainerElement.addItem(newCardElement);
// }

// Profile popup



const profilePopup = new PopupWithForm(profilePopupSelector, (formData) => {
  userInfo.setUserInfo(formData);
  profilePopup.close();
})

profilePopup.setEventListeners();

profilePopupOpenButton.addEventListener('click', () => {

  formValidatorProfileForm.cleanFormErrorFields();
  const userInfoInput = userInfo.getUserInfo();
  profileNameInput.value = userInfoInput.userName;
  profileJobInput.value = userInfoInput.userJob;

  profilePopup.open();
});

// Валидация форм

const formValidatorProfileForm = new FormValidator(formParameters, profileFormElement);
const formValidatorNewCardForm = new FormValidator(formParameters, newCardFormElement);

formValidatorNewCardForm.enableValidation();
formValidatorProfileForm.enableValidation();
















