const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const profilePopupCloseButton = document.querySelector('.popup-profile__close-button');
const profilePopupElement = document.querySelector('.popup-profile')
const profileFormElement = document.querySelector('.popup__container_profile_data');

const profileNameInput = document.querySelector('.popup__item_data_title');
const profileJobInput = document.querySelector('.popup__item_data_subtitle');

const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');




// универсальная функция открытия попапа

function openPopup(popup) {
  popup.classList.add('popup_display_opened');
}

// универсальная функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove('popup_display_opened');
}

// универсальная функция закрытия попапа кликом на область вне формы

function handleTargetClosePopup(event) {
  if (event.target === event.currentTarget)
    closePopup(event.target);
}

// Универсальная функция закрытия попапа нажатием на клавишу ESC

function handleKeyClosePopup(event, popup) {
  if (event.key === 'Escape')
    closePopup(popup);
}

// Объявляем функцию, которая вставляет текстовое содержимое в поля Input

function fillProfilePopupForm() {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;

}

// Открываем попап и вставляем данные из профиля в поля Input
const openProfilePopup = function () {
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



profilePopupOpenButton.addEventListener('click', openProfilePopup);

profilePopupCloseButton.addEventListener('click', function () {
  closePopup(profilePopupElement);
});

//  Закрываем попап нажатием на дисплей

profilePopupElement.addEventListener('mousedown', handleTargetClosePopup);

//  Закрытие попап нажатием на ESC

document.addEventListener('keydown', function (event) {
  handleKeyClosePopup(event, profilePopupElement);
});


// Отправляем форму

profileFormElement.addEventListener('submit', handleFormProfileSubmit);





// Реализация добавления карточек и подключение функционала

const templateContainer = document.querySelector('#cards__template').content;
const cardsList = document.querySelector('.cards__items');

// удаление карточки

function handleDelete(event) {
  event.target.closest('.element').remove();

}

// функуция, проставляющая лайки

function handleLike(event) {
  event.target.classList.toggle('element__icon_active');


}

const imagePopup = document.querySelector('.popup-image');
const imagePopupCloseButton = imagePopup.querySelector('.popup-image__close-button');
const imagePopupImageElement = imagePopup.querySelector('.popup-image__picture');
const imagePopupTextElement = imagePopup.querySelector('.popup-image__subtitle')

// открытие popup-image

function openImagePopup(link, name) {

  openPopup(imagePopup);
  imagePopupImageElement.src = link;
  imagePopupTextElement.textContent = name;
  imagePopupImageElement.alt = name;
}


// действия с template

function createNewCard(link, name) {
  const cardElement = templateContainer.cloneNode(true);


  const imageElement = cardElement.querySelector('.element__image');
  imageElement.src = link;
  imageElement.alt = name;
  imageElement.addEventListener('click', function () {
    openImagePopup(link, name);
  });

  cardElement.querySelector('.element__title').textContent = name;

  cardElement.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  cardElement.querySelector('.element__icon').addEventListener('click', handleLike);

  return cardElement;
}

// Добавляем новую карточку на страницу


function addCardToList(cardConteinerElement, link, name) {
  const cardElement = createNewCard(link, name);
  cardConteinerElement.append(cardElement);

}

// Действия с массивом initialCards

function render() {
  initialCards.forEach(function (item) {
    addCardToList(cardsList, item.link, item.name);
  });
}

// закрытие попап нажатием на область вне фото

imagePopup.addEventListener('mousedown', handleTargetClosePopup);

imagePopupCloseButton.addEventListener('click', function () {
  closePopup(imagePopup);
});

document.addEventListener('keydown', function (event) {
  handleKeyClosePopup(event, imagePopup);
});


render()






// Прописываем условия для popup-new-card

const popupNewCardOpenButton = document.querySelector('.profile__add-button');
const popupNewCardElement = document.querySelector('.popup-add-card');
const popupNewCardCloseButton = popupNewCardElement.querySelector('.popup-add-card__close-button');
const popupNewCardFormElement = popupNewCardElement.querySelector('.popup-add-card__container');

const newCardNameInput = popupNewCardElement.querySelector('.popup__item_data_name');
const newCardPlaceInput = popupNewCardElement.querySelector('.popup__item_data_place');



// вставляем вводимые данные в поля input


function prependCardToCardsContainer(cardConteinerElement, link, name) {

  const newCardElement = createNewCard(link, name);
  cardConteinerElement.prepend(newCardElement);

}

function cleanNewCardForm() {
  popupNewCardFormElement.reset();
}


function handleFormNewCardSubmit(event) {
  event.preventDefault();
  const link = newCardPlaceInput.value;
  const name = newCardNameInput.value;
  prependCardToCardsContainer(cardsList, link, name);
  closePopup(popupNewCardElement);
  cleanNewCardForm();

}


popupNewCardFormElement.addEventListener('submit', handleFormNewCardSubmit);

popupNewCardOpenButton.addEventListener('click', function () {
  openPopup(popupNewCardElement);
});

popupNewCardCloseButton.addEventListener('click', function () {
  closePopup(popupNewCardElement);
});

popupNewCardElement.addEventListener('mousedown', handleTargetClosePopup);

document.addEventListener('keydown', function (event) {
  handleKeyClosePopup(event, popupNewCardElement);
});













// Настраиваем валидацию

// Универсальная функция, добавляющая текст ошибки и подсветку поля


const formParameters = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'

};





function showInputError(formElement, inputElement, errorMessage, obj) {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

 // Универсальная функция, скрывающая ошибку и подстветку поля


function hideInputError(formElement, inputElement, obj) {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};


// Универсальная функция проверки поля на валидность


function isValid(formElement, inputElement, obj) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

// Проверка полей формы на валидность

function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid;
  });
};

// Функция добавляющая или снимающая атрибут disabled в зависимости от валидности поля



function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');

  }
}


// Универсальная функция, добавляющая обработчик событий всем полям ввода внути формы


function setEventListeners(formElement, obj) {

  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      isValid(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);

    });

  });
};


// Универсальная функция добавляющая обработчик всем формам на странице


function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach(function(formElement) {
    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
    });
    setEventListeners(formElement, obj);
  });
};



enableValidation(formParameters);


