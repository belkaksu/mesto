
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector)
    this._handleSubmitForm = handleSubmitForm
    this._form = this._popupSelector.querySelector('.popup__container');
    this._submitButton = this._popupSelector.querySelector('.popup__submit-button');
    this._initialButtonText = this._submitButton.textContent;
    this._inputList = this._form.querySelectorAll('.popup__item');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;

    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close()
    this._form.reset();
  }

  setLoadingState(isLoading, loadingStateText = "Сохранение...") {
    if (isLoading) {
      this._submitButton.textContent = loadingStateText
    } else {
      this._submitButton.textContent = this._initialButtonText;
    }
  }
}


