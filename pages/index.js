import { formParameters, FormValidator } from '../scripts/components/FormValidator.js';
import { initialCards } from '../scripts/utils/initial-cards.js';
import { Card } from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';

import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import './index.css';

import { cardsList, imagePopupSelector, profilePopupOpenButton, profilePopupSelector, profileFormElement, profileNameInput, profileJobInput, profileNameElement, profileJobElement, popupNewCardOpenButton, popupNewCardSelector, newCardFormElement, userAvatarElement } from '../scripts/utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '82034b5c-94c4-471a-b185-eb63c714f946',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards() {
  
};
api.getUserInfo();


const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup.setEventListeners();

// Отрисовка массива карточек

const cardsContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, '#cards__template', () => handleCardClick(item.link, item.name));
    cardsContainer.addItem(cardElement);
  }
}, cardsList);

// Функция заполнения попапа данными и его открытия

function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

// Создание карточки

function createCard(data, cardSelector, handleCardClick) {
  const card = new Card(data, cardSelector, handleCardClick);
  return card.generateCard();
}

// addCardPopup
// Добавляем новую карточку на страницу

const addCardPopup = new PopupWithForm(popupNewCardSelector, (formData) => {
  prependNewCardToCardsContainer(cardsContainer, formData.dataName, formData.dataLink)
  addCardPopup.close();
});

addCardPopup.setEventListeners();

popupNewCardOpenButton.addEventListener('click', () => {

  addCardPopup.open();
  formValidatorNewCardForm.enableValidation();
});

// Отрисовка новой карточки

function prependNewCardToCardsContainer(cardContainerElement, name, link) {

  const newCard = new Card({
    link: link,
    name: name
  }, '#cards__template', () => handleCardClick(link, name));
  const newCardElement = newCard.generateCard();
  cardContainerElement.addItem(newCardElement);
}

// Profile popup

const userInfo = new UserInfo(profileNameElement, profileJobElement)

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

cardsContainer.renderItems();














