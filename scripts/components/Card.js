export class Card {
  constructor({data, cardSelector, handleCardClick}) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Копируем элемент карточки

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  // Генерируем карточку

  generateCard() {
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
    this._element.querySelector('.element__image').addEventListener('click', (event) => {
      this._handleCardClick(event);
    });
  }

  // Ставим лайки

  _handleLike(event) {
    event.target.classList.toggle('element__icon_active');
  }

  // Удаляем карточку

  _handleDelete(event) {
    event.target.closest('.element').remove();
  }
}




// export class Card {
//   constructor({ data, userId, cardSelector, handleCardClick, handleDeleteClick, likeClick, dislikeClick }) {
//     this._link = data.link;
//     this._name = data.name;
//     this._likesArray = data.likes;
//     this._likesSum = data.likes.length;
//     this._cardOwnerId = data.owner._id;
//     this._likes = data.likes;
//     this._userId = userId;
//     this._cardSelector = cardSelector;
//     this._handleCardClick = handleCardClick;
//     this._handleDeleteClick = handleDeleteClick;
//     this._likeClick = likeClick;
//     this._dislikeClick = dislikeClick;

//   }

//   // Копируем элемент карточки

//   _getTemplate() {
//     const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
//     return cardElement;
//   }

//   // Генерируем карточку

//   generateCard() {
//     this._element = this._getTemplate();
//     this._setEventListeners();

//     this._imageElement = this._element.querySelector('.element__image');
//     this._likeIcon = this._element.querySelector('element__icon');
//     this._likesCounter = this._element.querySelector('.element__counter')
//     this._deleteIcon = this._element.querySelector('.element__delete-button');

//     this._imageElement.src = this._link;
//     this._imageElement.alt = this._name;
//     this._element.querySelector('.element__title').textContent = this._name;
//     this._likesCounter.textContent = this._likesArray;

//     this._toggleButtonIconImage();
//     this._hasUserLike()


//     return this._element;
//   }

//   _setEventListeners() {
//     this._likeIcon.addEventListener('click', () => {
//       this._handleLikeClick();
//     });
//     this._deleteIcon.addEventListener('click', () => {
//       this._handleDeleteClick;
//     });
//     this._imageElement('.element__image').addEventListener('click', () => {
//       this._handleCardClick(this._link, this._name);
//     });
//   }

//   // переключаем иконку лайка

//   _handleToggleLike() {
//     this._likeIcon.classList.toggle('element__icon_active');
//   }

//   // Удаляем карточку

//   handleDeleteCard() {
//     this._element.remove();
//     this._element = null;
//   }

//   // Прячем корзину если карточка чужая

//   _toggleButtonIconImage() {
//     if (!(this._userId === this._cardOwnerId)) {
//       this._deleteIcon.classList.add('.element__delete-button_display-active')
//     } else
//       this._deleteIcon.classList.remove('.element__delete-button_display-active')
//   }

//   //  Добавляем лайк

//   _hasUserLike() {
//     this._activeLike = Boolean(this._likesArray.find((item) => {
//       this._iserId === item._id
//     }))
//     if (this._activeLike) {
//       this._likeIcon.classList.add('.element__icon_active')
//     }
//   }

//   _handleLikeClick() {
//     if (this._likeIcon.classList.contains('.element__icon_active')) {
//       this._dislikeClick(this._likesCounter);
//     } else {
//       this._likeClick(this._likesCounter);
//     }
//     this._handleToggleLike()
//   }

// }
