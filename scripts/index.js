import { formParameters, FormValidator } from './FormValidator.js';
import { initialCards } from './initial-cards.js';
import { Card } from './cards.js/index.js';

const popups = document.querySelectorAll('.popup')

// Переменные profilePopup

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const profilePopupElement = document.querySelector('.popup-profile')
const profileFormElement = document.querySelector('.popup__container_profile_data');

const profileNameInput = document.querySelector('.popup__item_data_title');
const profileJobInput = document.querySelector('.popup__item_data_subtitle');

const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

// Переменные newCardPopup

const popupNewCardOpenButton = document.querySelector('.profile__add-button');
const popupNewCardElement = document.querySelector('.popup-add-card');
const newCardFormElement = popupNewCardElement.querySelector('.popup-add-card__container');
const newCardNameInput = popupNewCardElement.querySelector('.popup__item_data_name');
const newCardPlaceInput = popupNewCardElement.querySelector('.popup__item_data_place');

// Переменные ImagePopup

const imagePopup = document.querySelector('.popup-image');
const imagePopupImageElement = imagePopup.querySelector('.popup-image__picture');
const imagePopupTextElement = imagePopup.querySelector('.popup-image__subtitle');


const cardsList = document.querySelector('.cards__items');


const formValidatorProfileForm = new FormValidator(formParameters, profileFormElement);
const formValidatorNewCardForm = new FormValidator(formParameters, newCardFormElement);


// Универсальные функции

// Универсальная функция закрытия попапа нажатием на клавишу ESC

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_display_opened');
  closePopup(openedPopup);
  }
}

// универсальная функция открытия попапа

export function openPopup(popup) {
  popup.classList.add('popup_display_opened');
  document.addEventListener('keydown', closeByEscape);
};

// универсальная функция закрытия попапа

export function closePopup(popup) {
  popup.classList.remove('popup_display_opened');
  document.removeEventListener('keydown', closeByEscape);

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
  formValidatorProfileForm.cleanFormErrorFields();
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
  const cardElement = createCard(item, '#cards__template', handleCardClick);
  cardsList.append(cardElement);

});

// Создание карточки

function createCard(data, cardSelector, handleCardClick) {
  const card = new Card(data, cardSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавляем новую карточку в DOM

function prependCardToCardsContainer(cardConteinerElement) {

  const newCardElement = createCard(
    {link: newCardPlaceInput.value,
     name: newCardNameInput.value}, '#cards__template', handleCardClick);
  cardConteinerElement.prepend(newCardElement);
}

// функционал отправки формы NewCard

function handleFormNewCardSubmit(event) {
  event.preventDefault();
  prependCardToCardsContainer(cardsList);
  closePopup(popupNewCardElement);
}

// Открытие newCardPopup

function openNewCardPopup() {
  formValidatorNewCardForm.cleanFormErrorFields();
  cleanFormInput(newCardFormElement);
  openPopup(popupNewCardElement);
};


// Открыие popupImage

function handleCardClick(link, name) {

  imagePopupImageElement.src = link;
  imagePopupTextElement.textContent = name;
  imagePopupImageElement.alt = name;
  openPopup(imagePopup);
}

// Обработчики событий и вызовы функций


// Закрытие всех попапов нажатием на оверлей и "крестик"

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup_display_opened')) {
      closePopup(popup)
    };
    if (event.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  });

});


// profilePopup

profilePopupOpenButton.addEventListener('click', openProfilePopup);

// Отправляем форму

profileFormElement.addEventListener('submit', handleFormProfileSubmit);

// newCardPopup

newCardFormElement.addEventListener('submit', handleFormNewCardSubmit);

popupNewCardOpenButton.addEventListener('click', openNewCardPopup);

// Валидация форм

formValidatorProfileForm.enableValidation();
formValidatorNewCardForm.enableValidation();

//  Добавление карточек из массива initialCards

renderInitialCards();









