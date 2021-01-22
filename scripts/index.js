let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-button');

let togglePopup = function() {

  popup.classList.toggle('popup__opened');
}

openPopup.addEventListener('click', togglePopup);

closePopup.addEventListener('click', togglePopup);


popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget)
  togglePopup();
})


let formElement = document.querySelector('.popup__container');

let nameInput = document.querySelector('.popup__user-name');
let jobInput = document.querySelector('.popup__user-job');

let nameField = document.querySelector('.profile__title')
let jobField = document.querySelector('.profile__subtitle')


function formSubmitHandler(event) {
  event.preventDefault();

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  popup.classList.remove('popup__opened');
}



formElement.addEventListener('submit', formSubmitHandler);





