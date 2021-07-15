
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector)
    this._handleSubmitForm = handleSubmitForm
    this._form = 
  }

  _getInputValues() {

  }

  setEventListeners() {

  }



  close() {
    super.close()
  }
}
