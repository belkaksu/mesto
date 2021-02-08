const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const profilePopupCloseButton = document.querySelector('.popup-profile__close-button');
const profilePopupElement = document.querySelector('.popup-profile')
const profileFormElement = document.querySelector('.popup__container_profile_data');

const profileNameInput = document.querySelector('.popup__item_data_title');
const profileJobInput = document.querySelector('.popup__item_data_subtitle');

const profileNameElement = document.querySelector('.profile__title')
const profileJobElement = document.querySelector('.profile__subtitle')


// Объявляем функцию, которая вставляет текстовое содержимое в поля Input

// универсальная функция открытия попапа

function openPopup(popup) {
  popup.classList.add('popup_display_opened');
}

// универсальная функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove('popup_display_opened');
}


function fillProfilePopupForm() {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;

}

// Открываем попап и вставляем данные из профиля в поля Input
const openProfilePopup = function () {
  fillProfilePopupForm();
  openPopup(profilePopupElement);
}

// Закрываем попап

closePopup(profilePopupElement);


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

profilePopupCloseButton.addEventListener('click', closePopup);

//  Закрываем попап нажатием на дисплей
profilePopupElement.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget)
    closePopup(profilePopupElement);
})

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
const imagePopupCloseButton = imagePopup.querySelector('.close-button');
const imagePopupImageElement = imagePopup.querySelector('.popup-image__picture');
const imagePopupTextElement = imagePopup.querySelector('.popup-image__subtitle')

// открытие popup-image

function openImagePopup(link, name) {

  openPopup(imagePopup);
  imagePopupImageElement.src = link;
  imagePopupTextElement.textContent = name;
  imagePopupImageElement.alt = name;
}

// закрытие popup-image

function closeImagePopup() {
  closePopup(imagePopup);
}



// действия с template

function createNewCard(link, name) {
  const cardElement = templateContainer.cloneNode(true);


  const imageElement = cardElement.querySelector('.element__image');
  imageElement.src = link;
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

imagePopupCloseButton.addEventListener('click', closeImagePopup);

render()






// Прописываем условия для popup-new-card

const popupNewCardOpenButton = document.querySelector('.profile__add-button');
const popupNewCardElement = document.querySelector('.popup-add-card');
const popupNewCardCloseButton = popupNewCardElement.querySelector('.close-button');
const popupNewCardFormElement = popupNewCardElement.querySelector('.popup-add-card__container');

const newCardNameInput = popupNewCardElement.querySelector('.popup__item_data_name');
const newCardPlaceInput = popupNewCardElement.querySelector('.popup__item_data_place');

function openNewCardPopup() {
  openPopup(popupNewCardElement);

}

function closePopupNewCard() {
  closePopup(popupNewCardElement);
}

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
  closePopupNewCard();
  cleanNewCardForm();

}


popupNewCardFormElement.addEventListener('submit', handleFormNewCardSubmit);

popupNewCardOpenButton.addEventListener('click', openNewCardPopup);

popupNewCardCloseButton.addEventListener('click', closePopupNewCard);

popupNewCardElement.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget)
    closePopupNewCard();
})



