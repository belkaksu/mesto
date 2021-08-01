import { formParameters, FormValidator } from '../scripts/components/FormValidator.js';
import { initialCards } from '../scripts/utils/initial-cards.js';
import { Card } from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';

import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import './index.css';

import { cardsList, imagePopupSelector, profilePopupOpenButton, profilePopupSelector, profileFormElement, profileNameInput, profileJobInput, profileNameElement, profileJobElement, popupNewCardOpenButton, popupNewCardSelector, newCardFormElement, profileAvatarElement, profileAvatarButton, profileAvatarSelector, profileAvatarForm, popupCardDeleteSelector, popupCardDeleteForm } from '../scripts/utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '82034b5c-94c4-471a-b185-eb63c714f946',
    'Content-Type': 'application/json'
  }
});






const userInfo = new UserInfo(profileNameElement, profileJobElement, profileAvatarElement)



// Создание карточки

function createCard(dataCard) {
  const card = new Card({
    data: dataCard,
    cardSelector: '#cards__template',
    handleCardClick: (evt) => handleCardClick(evt)
  });
  return card.generateCard();
}

// Функция заполнения попапа данными и его открытия

function handleCardClick(evt) {
  const data = {};
  data.name = evt.target.alt;
  data.link = evt.target.src;
  imagePopup.open(data.link);
}

// Отрисовка массива карточек

const cardsContainer = new Section({
  renderer: (item) => {
    cardsContainer.addItem(createCard(item));
  }
}, cardsList);

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


// Profile popup


const profilePopup = new PopupWithForm(profilePopupSelector, (formData) => {
  const profileInfo = {
    name: formData.userName,
    about: formData.userJob
  }
  api.updateUserInfo(profileInfo)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about)
      profilePopup.close();
    }).catch((err) => {
      console.log('Ошибка обновлениыя данных профиля')
    })

})

profilePopup.setEventListeners();

profilePopupOpenButton.addEventListener('click', () => {

  formValidatorProfileForm.cleanFormErrorFields();
  const userInfoInput = userInfo.getUserInfo();
  profileNameInput.value = userInfoInput.userName;
  profileJobInput.value = userInfoInput.userJob;

  profilePopup.open();
});

const popupAvatar = new PopupWithForm(profileAvatarSelector, (updateAvatar) => {

  api.updateUserAvatar(updateAvatar)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupAvatar.close();
    }).catch((err) => {
      console.log("Ошибка обновления аватара")
    })
})



profileAvatarButton.addEventListener('click', () => {
  formValidatorAvatarForm.cleanFormErrorFields();
  popupAvatar.open();


})

popupAvatar.setEventListeners();

const popupCardDelete = new PopupWithSubmit(popupCardDeleteSelector)




// Валидация форм

const formValidatorProfileForm = new FormValidator(formParameters, profileFormElement);
const formValidatorNewCardForm = new FormValidator(formParameters, newCardFormElement);
const formValidatorAvatarForm = new FormValidator(formParameters, profileAvatarForm);

formValidatorNewCardForm.enableValidation();
formValidatorProfileForm.enableValidation();
formValidatorAvatarForm.enableValidation();



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











