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






