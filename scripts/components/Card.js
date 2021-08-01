export class Card {
  constructor({ data, userId, cardSelector, handleCardClick, handleDeleteClick, likeClick, dislikeClick }) {
    this._link = data.link;
    this._name = data.name;
    this._likesArray = data.likes;
    this._likesSum = data.likes.length;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likeClick = likeClick;
    this._dislikeClick = dislikeClick;

  }

  // Копируем элемент карточки

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  // Генерируем карточку

  generateCard() {
    this._element = this._getTemplate();


    this._imageElement = this._element.querySelector('.element__image');
    this._likeIcon = this._element.querySelector('.element__icon');
    this._likesCounter = this._element.querySelector('.element__counter')
    this._deleteButton = this._element.querySelector('.element__delete-button');

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._likesCounter.textContent = this._likesSum;

    this._toggleButtonIconImage();
    this._hasUserLike()
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeIcon.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._imageElement.addEventListener('click', (event) => {
      this._handleCardClick(event);
    });
  }

  // переключаем иконку лайка

  _handleToggleLike() {
    this._likeIcon.classList.toggle('element__icon_active');
  }

  // Удаляем карточку

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Прячем корзину если карточка чужая

  _toggleButtonIconImage() {
        if (this._userId === this._cardOwnerId) {

      this._deleteButton.classList.add('element__delete-button_display-active')
    } else
      this._deleteButton.classList.remove('element__delete-button_display-active')
  }

  //  Добавляем лайк

  _hasUserLike() {
    this._activeLike = Boolean(this._likesArray.find((item) => {
      this._userId === item._id
    }))
    if (this._activeLike) {
      this._likeIcon.classList.add('element__icon_active')
    }
  }

  _handleLikeClick() {
    if (this._likeIcon.classList.contains('element__icon_active')) {
      this._dislikeClick(this._likesCounter);
    } else {
      this._likeClick(this._likesCounter);
    }
    this._handleToggleLike()
  }

}
