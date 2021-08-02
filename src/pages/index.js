import { formParameters, FormValidator } from '../scripts/components/FormValidator.js';
import { Card } from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';

import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import '../../src/pages/index.css';

import { cardsList, imagePopupSelector, profilePopupOpenButton, profilePopupSelector, profileFormElement, profileNameInput, profileJobInput, profileNameElement, profileJobElement, popupNewCardOpenButton, popupNewCardSelector, newCardFormElement, profileAvatarElement, profileAvatarButton, profileAvatarSelector, profileAvatarForm, popupCardDeleteSelector } from '../scripts/utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '82034b5c-94c4-471a-b185-eb63c714f946',
    'Content-Type': 'application/json'
  }
});

let userId = null;

const userInfo = new UserInfo(profileNameElement, profileJobElement, profileAvatarElement)

// Отрисовка массива карточек

const cardsContainer = new Section({
  renderer: (item) => {
    cardsContainer.addItem(createCard(item));
  }
}, cardsList);

const imagePopup = new PopupWithImage(imagePopupSelector);

const popupCardDelete = new PopupWithSubmit(popupCardDeleteSelector)


// addCardPopup
// Добавляем новую карточку на страницу

const addCardPopup = new PopupWithForm(popupNewCardSelector, (formData) => {
  addCardPopup.setLoadingState(true)
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
    .finally(() => {
      addCardPopup.setLoadingState(false)
    })

});

// Profile popup


const profilePopup = new PopupWithForm(profilePopupSelector, (formData) => {
  profilePopup.setLoadingState(true)
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
    }).finally(() => {
      profilePopup.setLoadingState(false)
    })

})

const popupAvatar = new PopupWithForm(profileAvatarSelector, (updateAvatar) => {
  popupAvatar.setLoadingState(true)

  api.updateUserAvatar(updateAvatar)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupAvatar.close();
    }).catch((err) => {
      console.log("Ошибка обновления аватара")
    }).finally(() => {
      popupAvatar.setLoadingState(false)
    })
})

// Валидация форм

const formValidatorProfileForm = new FormValidator(formParameters, profileFormElement);
const formValidatorNewCardForm = new FormValidator(formParameters, newCardFormElement);
const formValidatorAvatarForm = new FormValidator(formParameters, profileAvatarForm);

formValidatorNewCardForm.enableValidation();
formValidatorProfileForm.enableValidation();
formValidatorAvatarForm.enableValidation();

imagePopup.setEventListeners();
popupCardDelete.setEventListeners();
addCardPopup.setEventListeners();
profilePopup.setEventListeners();
popupAvatar.setEventListeners();

popupNewCardOpenButton.addEventListener('click', () => {
  addCardPopup.open();
  formValidatorNewCardForm.cleanFormErrorFields();
});

profilePopupOpenButton.addEventListener('click', () => {

  formValidatorProfileForm.cleanFormErrorFields();
  const userInfoInput = userInfo.getUserInfo();
  profileNameInput.value = userInfoInput.userName;
  profileJobInput.value = userInfoInput.userJob;
  profilePopup.open();
});

profileAvatarButton.addEventListener('click', () => {
  formValidatorAvatarForm.cleanFormErrorFields();
  popupAvatar.open();
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {

    userInfo.setUserInfo(userData.name, userData.about)
    userInfo.setUserAvatar(userData.avatar)
    userId = userData._id;
    cardsContainer.renderItems(cardData);
  })
  .catch((err) => {
    console.log(err);
  });

// Создание карточки

function createCard(dataCard) {

  const card = new Card({
    data: dataCard,
    userId: userId,
    cardSelector: '#cards__template',
    handleCardClick: (name, link) => {
      imagePopup.open(link, name);
    },
    handleDeleteClick: () => {
      popupCardDelete.open();
      popupCardDelete.setFormSubmit(() => {
        api.deleteCard(dataCard._id)
          .then(() => {
            card.handleDeleteCard();
            popupCardDelete.close();
          }).catch((err) => {
            console.log('Ошибка удаления карточки')
          })
      })
    },
    likeClick: (likesCounter) => {
      api.putLike(dataCard._id)
        .then((res) => {
          likesCounter.textContent = res.likes.length;
         }).catch((err) => {
          console.log('Ошибка функции счетчика лайка (put)')
        })
    },
    dislikeClick: (likesCounter) => {
      api.deleteLike(dataCard._id)
        .then((res) => {
          likesCounter.textContent = res.likes.length;
        }).catch((err) => {
          console.log('Ошибка функции счетчика лайка (delete)')
        })
    },
  });
  return card.generateCard();
}

// // Функция заполнения попапа данными и его открытия

// function handleCardClick() {

//     imagePopup.open(data.link, data.name);
// // }









