import Popup from '../components/Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
  super(popupSelector)
  this._imagePopupImageElement = this._popup.querySelector('.popup-image__picture');
  this._imagePopupTextElement = this._popup.querySelector('.popup-image__subtitle');
  }

  open(link, name) {
    imagePopupImageElement.src = link;
    imagePopupTextElement.textContent = name;
    imagePopupImageElement.alt = name;
    super.open()


  }
}
