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
    name: 'Карачаево-Черкессия',
    link: 'https://images.unsplash.com/photo-1584533732622-ed52ed0025c6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
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
    name: 'Эльбрус',
    link: 'https://images.unsplash.com/photo-1518277232585-44d47773da22?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
  },
  {
    name: 'Дагестан',
    link: 'https://images.unsplash.com/photo-1572521620972-07eecf7d945e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  }
];

const templateContainer = document.querySelector('#cards__template').content;
const listItems = document.querySelector('.cards__items');

function renderItem(card) {
  const cardElement = templateContainer.cloneNode(true);
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__title').textContent = card.name;
  listItems.append(cardElement);

}

function render() {
  initialCards.forEach(renderItem);
}

render()



