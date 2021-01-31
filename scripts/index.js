let openPopupElement = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let closePopupElement = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');

let nameInput = document.querySelector('.popup__item_data_title');
let jobInput = document.querySelector('.popup__item_data_subtitle');

let nameElement = document.querySelector('.profile__title')
let jobElement = document.querySelector('.profile__subtitle')


// Объявляем функцию, которая вставляет текстовое содержимое в поля Input

function fillPopupForm() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

}

// Открываем попап и вставляем данные из профиля в поля Input
let openPopup = function () {
  fillPopupForm();
  popupElement.classList.add('popup_display_opened');
}

// Закрываем попап

let closePopup = function () {
  popupElement.classList.remove('popup_display_opened');
}

// Объявляем функцию, которая вставляет введенные данные в профиль пользователя
function setProfileData() {
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

}

//  Вставляем введенную информацию в профиль, закрываем попап нажатием на кнопку "сохранить"

function formSubmitHandler(event) {
  event.preventDefault();
  setProfileData();
  closePopup();
}

openPopupElement.addEventListener('click', openPopup);

closePopupElement.addEventListener('click', closePopup);

//  Закрываем попап нажатием на дисплей
popupElement.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget)
    closePopup();
})

// Отправляем форму

formElement.addEventListener('submit', formSubmitHandler);


const initialCards = [
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1490879112094-281fea0883dc?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: 'Сулакский каньон',
    link: 'https://images.unsplash.com/photo-1598535348425-e76a7cc312d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1573156667495-f14c98bc2ebc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2001&q=80'
  },
  {
    name: 'Зеленоград',
    link: 'https://images.unsplash.com/photo-1536577722576-fcfdbcad17e9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80'
  },
  {
    name: 'Красная Поляна',
    link: 'https://images.unsplash.com/photo-1595762655589-ad9796b07894?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'
  }
];

const templateContainer = document.querySelector('#cards__template').content;
const cardsList = document.querySelector('.cards__items');

// удаление карточки

function handleDelete(event) {
  event.target.closest('.element').remove();

}

// функуция, проставляющая лайки

function handleLike(event) {

  const className = 'element__icon_button_active';
  const likeButton = event.target.closest('.element__icon');
  const isLiked = likeButton.classList.contains(className);
  if (isLiked) {
    likeButton.classList.remove(className);

  } else {
    likeButton.classList.add(className);
  }

}

// все действия с template

function addCardToList(cardParams) {
  const cardElement = createNewCard(cardParams.link,cardParams.name);
  cardsList.append(cardElement);

}
function createNewCard(link, name) {
  const cardElement = templateContainer.cloneNode(true);
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  cardElement.querySelector('.element__icon').addEventListener('click', handleLike);
  return cardElement;
}

// Действия с массивом initialCards

function render() {
  initialCards.forEach(addCardToList);
}

render()


// Прописываем условия для popup-new-card

const popupNewCardOpenButton = document.querySelector('.profile__add-button');
const popupNewCardElement = document.querySelector('.popup-new-card');
const popupNewCardCloseButton = popupNewCardElement.querySelector('.popup-new-card__close-button');
const popupNewCardFormElement = popupNewCardElement.querySelector('.popup-new-card__container');

const newCardNameInput = popupNewCardElement.querySelector('.popup-new-card__item_data_name');
const newCardPlaceInput = popupNewCardElement.querySelector('.popup-new-card__item_data_place');

function openPopupNewCard() {
  popupNewCardElement.classList.add('popup-new-card_display_opened');

}

function closePopupNewCard() {
  popupNewCardElement.classList.remove('popup-new-card_display_opened');
}




function setProfileDataNewCard() {

  const  newCardElement =  createNewCard(newCardPlaceInput.value,newCardNameInput.value);
  cardsList.prepend(newCardElement);


}


function newCardFormSubmitHandler(event) {
  event.preventDefault();
  setProfileDataNewCard();
  closePopupNewCard();

}


popupNewCardFormElement.addEventListener('submit', newCardFormSubmitHandler);



popupNewCardOpenButton.addEventListener('click', openPopupNewCard);

popupNewCardCloseButton.addEventListener('click', closePopupNewCard);

popupNewCardElement.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget)
    closePopupNewCard();
})



