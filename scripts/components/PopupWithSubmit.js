import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = popupSelector.querySelector('.popup__container');
    this._handleSubmitCallback = null;
  }

  setFormSubmit(handler) {
    this._handleSubmitCallback = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitCallback()
    });
  }
}

