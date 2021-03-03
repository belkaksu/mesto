// Настраиваем валидацию

const formParameters = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  spanSelector: '.popup__item-error',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active',
};

class FormValidator {

  constructor(objSelector, currentForm) {
    this._formSelector = objSelector.formSelector;
    this._inputSelector = objSelector.inputSelector;
    this._submitButtonSelector = objSelector.submitButtonSelector;
    this._spanSelector = objSelector.spanSelector;
    this._inactiveButtonClass = objSelector.inactiveButtonClass;
    this._inputErrorClass = objSelector.inputErrorClass;
    this._errorClass = objSelector.errorClass;

    this._currentForm = currentForm;
  }
  _showInputError(formElement, inputElement, errorMessage) {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners(formElement) {

    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  cleanFormErrorFields(formElement) {
    const errorList = Array.from(formElement.querySelectorAll(this._spanSelector));
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);

    inputList.forEach((inputElement) => {
       inputElement.classList.remove(this._inputErrorClass);
     });

     errorList.forEach(function(errorElement) {
      errorElement.textContent = "";
    });
   };

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  };

}

const formValidator = new FormValidator(formParameters);









  // // Универсальная форма очистки сообщений об ошибках и блокировки кнопки перед каждым открытием попап

  // function cleanFormErrorFields(formElement, formParams) {
  //   const errorList = Array.from(formElement.querySelectorAll(formParams.spanSelector));
  //   const inputList = Array.from(formElement.querySelectorAll(formParams.inputSelector));
  //   const buttonElement = formElement.querySelector(formParameters.submitButtonSelector);

  //   buttonElement.classList.add(formParams.inactiveButtonClass);
  //   buttonElement.setAttribute('disabled', true);

  //   inputList.forEach(function(inputElement) {
  //      inputElement.classList.remove(formParams.inputErrorClass);
  //    });

  //    errorList.forEach(function(errorElement) {
  //     errorElement.textContent = "";
  //   });
  //  };

  // function showInputError(formElement, inputElement, errorMessage, formParams) {

  //   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  //   inputElement.classList.add(formParams.inputErrorClass);
  //   errorElement.textContent = errorMessage;
  //   errorElement.classList.add(formParams.errorClass);
  // };

  //  // Универсальная функция, скрывающая ошибку и подстветку поля

  // function hideInputError(formElement, inputElement, formParams) {

  //   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  //   inputElement.classList.remove(formParams.inputErrorClass);
  //   errorElement.classList.remove(formParams.errorClass);
  //   errorElement.textContent = '';
  // };

  // // Универсальная функция проверки поля на валидность

  // function isValid(formElement, inputElement, formParams) {
  //   if (!inputElement.validity.valid) {
  //     showInputError(formElement, inputElement, inputElement.validationMessage, formParams);
  //   } else {
  //     hideInputError(formElement, inputElement, formParams);
  //   }
  // };

  // // Проверка полей формы на валидность

  // function hasInvalidInput(inputList) {
  //   return inputList.some(function(inputElement) {
  //     return !inputElement.validity.valid;
  //   });
  // };

  // // Функция добавляющая или снимающая атрибут disabled в зависимости от валидности поля

  // function toggleButtonState(inputList, buttonElement, formParams) {
  //   if (hasInvalidInput(inputList)) {
  //     buttonElement.classList.add(formParams.inactiveButtonClass);
  //     buttonElement.setAttribute('disabled', true);
  //   } else {
  //     buttonElement.classList.remove(formParams.inactiveButtonClass);
  //     buttonElement.removeAttribute('disabled');
  //   }
  // }

  // // Универсальная функция, добавляющая обработчик событий всем полям ввода внути формы

  // function setEventListeners(formElement, formParams) {

  //   const inputList = Array.from(formElement.querySelectorAll(formParams.inputSelector));
  //   const buttonElement = formElement.querySelector(formParams.submitButtonSelector);

  //   toggleButtonState(inputList, buttonElement, formParams);

  //   inputList.forEach(function(inputElement) {
  //     inputElement.addEventListener('input', function() {
  //       isValid(formElement, inputElement, formParams);
  //       toggleButtonState(inputList, buttonElement, formParams);
  //     });
  //   });
  // };

  // // Универсальная функция добавляющая обработчик всем формам на странице

  // function enableValidation(formParams) {
  //   const formList = Array.from(document.querySelectorAll(formParams.formSelector));

  //   formList.forEach(function(formElement) {
  //     formElement.addEventListener('submit', function(event) {
  //       event.preventDefault();
  //     });
  //     setEventListeners(formElement, formParams);
  //   });
  // };

  // enableValidation(formParameters);


