let openPopupElement = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let closePopupElement = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');

let nameInput = document.querySelector('.popup__item_title_data');
let jobInput = document.querySelector('.popup__item_subtitle_data');

let nameElement = document.querySelector('.profile__title')
let jobElement = document.querySelector('.profile__subtitle')

// Получаем текстовое содержимое из профиля

let getProfileData = function () {
  let name = nameElement.textContent;
  let job = jobElement.textContent;
  return { name, job };
}

// Открываем попап и вставляем данные из профиля в поля Input
let openPopup = function () {
  let profileData = getProfileData();
  fillPopupForm(profileData);
  popupElement.classList.add('popup_display_opened');
}

// Объявляем функцию, которая вставляет текстовое содержимое в поля Input

function fillPopupForm(profileData) {
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
}

// Закрываем попап

let closePopup = function () {
  popupElement.classList.remove('popup_display_opened');
}

//  Вставляем введенную информацию в профиль, закрываем попап нажатием на кнопку "сохранить"

function formSubmitHandler(event) {
  event.preventDefault();
  setProfileData();
  closePopup();
}

// Объявляем функцию, которая вставляет введенные данные в профиль пользователя
function setProfileData() {
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

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










