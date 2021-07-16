import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
  super(popupSelector)

  this._imagePopupImageElement = this._popupSelector.querySelector('.popup-image__picture');
  this._imagePopupTextElement = this._popupSelector.querySelector('.popup-image__subtitle');
  }

  open(link, name) {


  this._imagePopupImageElement.src = link;
  this._imagePopupImageElement.textContent = name;
  this._imagePopupTextElement = name;

  super.open()

  }
}
