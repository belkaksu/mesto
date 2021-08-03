
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

  constructor(formParams, currentForm) {
    this._formSelector = formParams.formSelector;
    this._inputSelector = formParams.inputSelector;
    this._submitButtonSelector = formParams.submitButtonSelector;
    this._spanSelector = formParams.spanSelector;
    this._inactiveButtonClass = formParams.inactiveButtonClass;
    this._inputErrorClass = formParams.inputErrorClass;
    this._errorClass = formParams.errorClass;
    this._inputList = Array.from(currentForm.querySelectorAll(this._inputSelector));
    this._buttonElement = currentForm.querySelector(this._submitButtonSelector);
    this._errorList = Array.from(currentForm.querySelectorAll(this._spanSelector));

    this._currentForm = currentForm;

  }

  // Показываем сообщение об ошибке

  _showInputError(inputElement, errorMessage) {

    const errorElement = this._currentForm.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Скрываем сообщение об ошибке

  _hideInputError(inputElement) {

    const errorElement = this._currentForm.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Проверяем поле формы на валидность

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //Проверяем все поля на валидность

  _hasInvalidInput() {
     return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Состояние кнопки "отправить", в зависимости от валидности полей

  _toggleButtonState() {

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();

      });
    });
  };

  // Функция очистки полей и сообщений об ошибках. Сделала ее публичной, так как она вызывается при открытии попап

  cleanFormErrorFields() {

    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);

    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
    });

    this._errorList.forEach(function (errorElement) {
      errorElement.textContent = "";
    });
  };

  //  Проверяет на валидность все формы

  enableValidation() {
    this._currentForm.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  };
}









