let openPopupElement = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let closePopupElement = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');

let nameInput = document.querySelector('.popup_name_data');
let jobInput = document.querySelector('.popup_job_data');

let nameElement = document.querySelector('.profile__title')
let jobElement = document.querySelector('.profile__subtitle')

let getProfileData = function () {
  let name = nameElement.textContent;
  let job = jobElement.textContent;
  return { name, job };
}

let openPopup = function () {
  let profileData = getProfileData();
  fillPopupForm(profileData);
  popupElement.classList.add('popup__opened');
}

function fillPopupForm(profileData) {
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
}

let closePopup = function () {
  popupElement.classList.remove('popup__opened');
}

let togglePopup = function () {
  popupElement.classList.toggle('popup__opened');
}

openPopupElement.addEventListener('click', openPopup);

closePopupElement.addEventListener('click', closePopup);

popupElement.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget)
    closePopup();
})




formElement.addEventListener('submit', formSubmitHandler);


function formSubmitHandler(event) {
  event.preventDefault();
  setProfileData();
  closePopup();
}

function setProfileData() {
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
}








