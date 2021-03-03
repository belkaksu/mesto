// Переменные profilePopup

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const profilePopupCloseButton = document.querySelector('.popup-profile__close-button');
const profilePopupElement = document.querySelector('.popup-profile')
const profileFormElement = document.querySelector('.popup__container_profile_data');

const profileNameInput = document.querySelector('.popup__item_data_title');
const profileJobInput = document.querySelector('.popup__item_data_subtitle');

const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

// Переменные imagePopup

const imagePopup = document.querySelector('.popup-image');
const imagePopupCloseButton = imagePopup.querySelector('.popup-image__close-button');
const imagePopupImageElement = imagePopup.querySelector('.popup-image__picture');
const imagePopupTextElement = imagePopup.querySelector('.popup-image__subtitle');

// Переменные newCardPopup

const popupNewCardOpenButton = document.querySelector('.profile__add-button');
const popupNewCardElement = document.querySelector('.popup-add-card');
const popupNewCardCloseButton = popupNewCardElement.querySelector('.popup-add-card__close-button');
const popupNewCardFormElement = popupNewCardElement.querySelector('.popup-add-card__container');
const newCardNameInput = popupNewCardElement.querySelector('.popup__item_data_name');
const newCardPlaceInput = popupNewCardElement.querySelector('.popup__item_data_place');

const templateContainer = document.querySelector('#cards__template').content;
const cardsList = document.querySelector('.cards__items');


// Универсальные функции

// Универсальная функция закрытия попапа нажатием на клавишу ESC

function handleKeyClosePopup(event, popup) {
  if (event.key === 'Escape')
    closePopup(popup);
}

// универсальная функция открытия попапа

function openPopup(popup) {
  popup.classList.add('popup_display_opened');
  document.addEventListener('keyup', (event) => {
    handleKeyClosePopup(event, popup);
  });
};

// универсальная функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove('popup_display_opened');
  document.removeEventListener('keyup', (event) => {
    handleKeyClosePopup(event, popup);
  });
}

// универсальная функция закрытия попапа кликом на область вне формы

function handleTargetClosePopup(event) {
  if (event.target === event.currentTarget)
    closePopup(event.target);
}

// Универсальная функция очитки полей формы

function cleanFormInput(formElement) {
  formElement.reset();
}

// Функции для profilePopup

// Объявляем функцию, которая вставляет текстовое содержимое в поля Input

function fillProfilePopupForm() {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
}

// Открываем попап и вставляем данные из профиля в поля Input
function openProfilePopup() {
  this.cleanFormErrorFields(profileFormElement);
  fillProfilePopupForm();
  openPopup(profilePopupElement);
}

// Объявляем функцию, которая вставляет введенные данные в профиль пользователя

function setProfileData() {
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
}

//  Вставляем введенную информацию в профиль, закрываем попап нажатием на кнопку "сохранить"

function handleFormProfileSubmit(event) {
  event.preventDefault();
  setProfileData();
  closePopup(profilePopupElement);
}

// Реализация добавления карточек и подключение функционала

// удаление карточки

// function handleDelete(event) {
//   event.target.closest('.element').remove();
// }



// открытие popup-image

// function openImagePopup(link, name) {

//   openPopup(imagePopup);
//   imagePopupImageElement.src = link;
//   imagePopupTextElement.textContent = name;
//   imagePopupImageElement.alt = name;
// }

//  не забыть удалить

// const imagePopup = document.querySelector('.popup-image');
// const imagePopupCloseButton = imagePopup.querySelector('.popup-image__close-button');
// const imagePopupImageElement = imagePopup.querySelector('.popup-image__picture');
// const imagePopupTextElement = imagePopup.querySelector('.popup-image__subtitle');





class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard(link, name) {
    this._element = this._getTemplate();
    this._setEventListeners();

    const _imageElement = this._element.querySelector('.element__image');
    _imageElement.src = this._link;
    _imageElement.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__icon').addEventListener('click', (event) => {
      this._handleLike(event);
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', (event) => {
      this._handleDelete(event);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    imagePopupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    })
    imagePopup.addEventListener('mousedown', (event) => {
      this._handleTargetClosePopup(event);
    })
  }

  _handleLike(event) {
    event.target.classList.toggle('element__icon_active');
  }

  _handleDelete(event) {
    event.target.closest('.element').remove();
  }
  _handleOpenPopup() {
    openPopup(imagePopup);
    imagePopupImageElement.src = this._link;
    imagePopupTextElement.textContent = this._name;
    imagePopupImageElement.alt = this._name;
  }

  _handleClosePopup() {
    closePopup(imagePopup);
  }

  _handleTargetClosePopup(event) {
    handleTargetClosePopup(event);
  }
}


// Обходим массив и добавляем карточки на страницу

initialCards.forEach((item) => {
  const card = new Card(item, '#cards__template');
  const cardElement = card.generateCard();
  cardsList.append(cardElement);

});

// функционал отправки формы NewCard

function handleFormNewCardSubmit(event) {
  event.preventDefault();
  const link = newCardPlaceInput.value;
  const name = newCardNameInput.value;
  prependCardToCardsContainer(cardsList, link, name);
  closePopup(popupNewCardElement);
}

// Открытие newCardPopup

function openNewCardPopup() {
  this.cleanFormErrorFields(popupNewCardFormElement);
  cleanFormInput(popupNewCardFormElement);
  openPopup(popupNewCardElement);
};

// Обработчики событий и вызовы функций

// profilePopup

profilePopupOpenButton.addEventListener('click', openProfilePopup);

profilePopupCloseButton.addEventListener('click', function () {
  closePopup(profilePopupElement);
});

//  Закрываем попап нажатием на дисплей

profilePopupElement.addEventListener('mousedown', handleTargetClosePopup);

// Отправляем форму

profileFormElement.addEventListener('submit', handleFormProfileSubmit);

// imagePopup

// закрытие попап нажатием на область вне фото

// imagePopup.addEventListener('mousedown', handleTargetClosePopup);

// imagePopupCloseButton.addEventListener('click', function () {
//   closePopup(imagePopup);
// });

// renderInitialCards()

// newCardPopup

popupNewCardFormElement.addEventListener('submit', handleFormNewCardSubmit);

popupNewCardOpenButton.addEventListener('click', openNewCardPopup);

popupNewCardCloseButton.addEventListener('click', function () {
  closePopup(popupNewCardElement);
});

popupNewCardElement.addEventListener('mousedown', handleTargetClosePopup);














