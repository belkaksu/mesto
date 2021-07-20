import { formParameters, FormValidator } from '../scripts/components/FormValidator.js';
import { initialCards } from '../scripts/utils/initial-cards.js';
import { Card } from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';

import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';


import { cardsList, imagePopupSelector, profilePopupOpenButton, profilePopupSelector, profileFormElement, profileNameSelector, profileJobSelector, profileNameElement, profileJobElement, popupNewCardOpenButton, popupNewCardSelector, newCardFormElement } from '../scripts/utils/constants.js';



const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup.setEventListeners();

const cardsContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, '#cards__template', () => handleCardClick(item.link, item.name));

    cardsContainer.addItem(cardElement);
  }
}, cardsList);


// Создание карточки

function createCard(data, cardSelector, handleCardClick) {
  const card = new Card(data, cardSelector, handleCardClick);
  return card.generateCard();

}

// Функция заполнения попапа данными и его открытия


function handleCardClick(link, name) {

  imagePopup.open(link, name);
}


const formValidatorProfileForm = new FormValidator(formParameters, profileFormElement);
const formValidatorNewCardForm = new FormValidator(formParameters, newCardFormElement);

formValidatorNewCardForm.enableValidation();
formValidatorProfileForm.enableValidation();





cardsContainer.renderItems();




// Универсальная функция очитки полей формы

// function cleanFormInput(formElement) {
//   formElement.reset();
// }

// Функции для profilePopup

// Объявляем функцию, которая вставляет текстовое содержимое в поля Input

// function fillProfilePopupForm() {
//   profileNameInput.value = profileNameElement.textContent;
//   profileJobInput.value = profileJobElement.textContent;
// }

// Открываем попап и вставляем данные из профиля в поля Input
// function openProfilePopup() {
//   formValidatorProfileForm.cleanFormErrorFields();
//   fillProfilePopupForm();
//   openPopup(profilePopupElement);
// }

// Объявляем функцию, которая вставляет введенные данные в профиль пользователя

// function setProfileData() {
//   profileNameElement.textContent = profileNameInput.value;
//   profileJobElement.textContent = profileJobInput.value;
// }

//  Вставляем введенную информацию в профиль, закрываем попап нажатием на кнопку "сохранить"

// function handleFormProfileSubmit(event) {
//   event.preventDefault();
//   setProfileData();
//   closePopup(profilePopupElement);
// }

// Обходим массив и добавляем карточки на страницу

const addCardPopup = new PopupWithForm(popupNewCardSelector, (formData) => {
  prependNewCardToCardsContainer(cardsContainer, formData.dataName, formData.dataLink)

  addCardPopup.close();



})

addCardPopup.setEventListeners()

popupNewCardOpenButton.addEventListener('click', () => {

  addCardPopup.open();
  formValidatorNewCardForm.enableValidation();




});

const profilePopup = new PopupWithForm(profilePopupSelector, (formData) => {

  userInfo.setUserInfo(formData);
  profilePopup.close();




})

profilePopup.setEventListeners()

profilePopupOpenButton.addEventListener('click', () => {

  const userInfoInput = userInfo.getUserInfo();
  profileNameSelector.value = userInfoInput.userName;
  profileJobSelector.value = userInfoInput.userJob;
  profilePopup.open();
  formValidatorProfileForm.enableValidation();




});

const userInfo = new UserInfo(profileNameElement, profileJobElement)




// Добавляем новую карточку в DOM

function prependNewCardToCardsContainer(cardConteinerElement, name, link) {

  const newCard = new Card({
    link: link,
    name: name
  }, '#cards__template', () => handleCardClick(link, name));
  const newCardElement = newCard.generateCard();
  cardConteinerElement.addItem(newCardElement);
}





// profilePopup

// profilePopupOpenButton.addEventListener('click', openProfilePopup);

// // Отправляем форму

// profileFormElement.addEventListener('submit', handleFormProfileSubmit);

// // newCardPopup

// newCardFormElement.addEventListener('submit', handleFormNewCardSubmit);

// popupNewCardOpenButton.addEventListener('click', openNewCardPopup);

// Валидация форм











