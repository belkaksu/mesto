// Настраиваем валидацию

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


