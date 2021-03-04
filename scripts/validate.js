
export const formParameters = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  spanSelector: '.popup__item-error',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active',
};

export class FormValidator {

  constructor(objSelector, currentForm) {
    this._formSelector = objSelector.formSelector;
    this._inputSelector = objSelector.inputSelector;
    this._submitButtonSelector = objSelector.submitButtonSelector;
    this._spanSelector = objSelector.spanSelector;
    this._inactiveButtonClass = objSelector.inactiveButtonClass;
    this._inputErrorClass = objSelector.inputErrorClass;
    this._errorClass = objSelector.errorClass;

    this._currentForm = currentForm;
    // this.enableValidation();
  }

  // Показываем сообщение об ошибке

  _showInputError(formElement, inputElement, errorMessage) {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Скрываем сообщение об ошибке

  _hideInputError(formElement, inputElement) {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Проверяем поле формы на валидность

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  //Проверяем все поля на валидность

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Состояние кнопки "отправить", в зависимости от валидности полей

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

  // Функция очистки полей и сообщений об ошибках. Сделала ее публичной, так как она вызывается при открытии попап

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

  //  Проверяет на валидность все формы

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








