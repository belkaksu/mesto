import { formParameters, FormValidator } from './Validate.js';
import { initialCards } from './initial-cards.js';
import { Card } from './Card.js';

// Переменные profilePopup

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const profilePopupCloseButton = document.querySelector('.popup-profile__close-button');
const profilePopupElement = document.querySelector('.popup-profile')
const profileFormElement = document.querySelector('.popup__container_profile_data');

const profileNameInput = document.querySelector('.popup__item_data_title');
const profileJobInput = document.querySelector('.popup__item_data_subtitle');

const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

// Переменные newCardPopup

const popupNewCardOpenButton = document.querySelector('.profile__add-button');
const popupNewCardElement = document.querySelector('.popup-add-card');
const popupNewCardCloseButton = popupNewCardElement.querySelector('.popup-add-card__close-button');
const NewCardFormElement = popupNewCardElement.querySelector('.popup-add-card__container');
const newCardNameInput = popupNewCardElement.querySelector('.popup__item_data_name');
const newCardPlaceInput = popupNewCardElement.querySelector('.popup__item_data_place');

const cardsList = document.querySelector('.cards__items');


const formValidatorProfileForm = new FormValidator(formParameters, profileFormElement);
const formValidatorNewCardForm = new FormValidator(formParameters, NewCardFormElement);


// Универсальные функции

// Универсальная функция закрытия попапа нажатием на клавишу ESC

function handleKeyClosePopup(event, popup) {
  if (event.key === 'Escape')
    closePopup(popup);
}

// универсальная функция открытия попапа

export function openPopup(popup) {
  popup.classList.add('popup_display_opened');
  document.addEventListener('keyup', (event) => {
    handleKeyClosePopup(event, popup);
  });
};

// универсальная функция закрытия попапа

export function closePopup(popup) {
  popup.classList.remove('popup_display_opened');
  document.removeEventListener('keyup', (event) => {
    handleKeyClosePopup(event, popup);
  });
}

// универсальная функция закрытия попапа кликом на область вне формы

export function handleTargetClosePopup(event) {
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
  formValidatorProfileForm.cleanFormErrorFields(profileFormElement);
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

// Обходим массив и добавляем карточки на страницу

function renderInitialCards() {}
initialCards.forEach((item) => {
  const card = new Card(item, '#cards__template');
  const cardElement = card.generateCard();
  cardsList.append(cardElement);

});

function prependCardToCardsContainer(cardConteinerElement, card) {

  const newCardElement = card.generateCard();
  cardConteinerElement.prepend(newCardElement);
}

// функционал отправки формы NewCard

function handleFormNewCardSubmit(event) {
  event.preventDefault();
  const card = new Card(
   {link: newCardPlaceInput.value,
    name: newCardNameInput.value}, '#cards__template');
  prependCardToCardsContainer(cardsList, card);
  closePopup(popupNewCardElement);
}

// Открытие newCardPopup

function openNewCardPopup() {
  formValidatorNewCardForm.cleanFormErrorFields(NewCardFormElement);
  cleanFormInput(NewCardFormElement);
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

// newCardPopup

NewCardFormElement.addEventListener('submit', handleFormNewCardSubmit);

popupNewCardOpenButton.addEventListener('click', openNewCardPopup);

popupNewCardCloseButton.addEventListener('click', function () {
  closePopup(popupNewCardElement);
});

popupNewCardElement.addEventListener('mousedown', handleTargetClosePopup);


// Валидация форм

formValidatorProfileForm.enableValidation();
formValidatorNewCardForm.enableValidation();

//  Добавление карточек из массива initialCards

renderInitialCards();









