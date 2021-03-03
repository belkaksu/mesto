class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard(link, name) {
    this._element = this._getTemplate();
    this._setEventListeners();

    const _imageElement = this._element.querySelector('.element__image');
    _imageElement.src = this._link;
    _imageElement.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__icon').addEventListener('click', (event) => {
      this._handleLike(event);
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', (event) => {
      this._handleDelete(event);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    imagePopupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    })
    imagePopup.addEventListener('mousedown', (event) => {
      this._handleTargetClosePopup(event);
    })
  }

  _handleLike(event) {
    event.target.classList.toggle('element__icon_active');
  }

  _handleDelete(event) {
    event.target.closest('.element').remove();
  }
  _handleOpenPopup() {
    openPopup(imagePopup);
    imagePopupImageElement.src = this._link;
    imagePopupTextElement.textContent = this._name;
    imagePopupImageElement.alt = this._name;
  }

  _handleClosePopup() {
    closePopup(imagePopup);
  }

  _handleTargetClosePopup(event) {
    handleTargetClosePopup(event);
  }
}
