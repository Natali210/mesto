export default class Card {
  constructor(data, cardSelector, handleCardClick, { userId, handleAddLike, handleRemoveLike, handleDeletingSubmit }) {
    this._name = data.name;
    this._link = data.link;
    this._id = userId;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeletingSubmit = handleDeletingSubmit;
  }
  
  //Функция, чтобы возвращать разметку и клонировать элемент
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

  return cardElement;
  }

  //Функция, которая подготовит карточку к публикации
  generateCard() {
    //Запись разметки в поле element, чтобы у других элементов появился доступ к ней
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector('.element__image')
    this._titleImageElement = this._element.querySelector('.element__title')
    this._cardDeleteButton = this._element.querySelector('.element__delete');
    this._cardLikeButton = this._element.querySelector('.element__like');
    this._likeAmount = this._element.querySelector('.element__like-amount')
    this._cardImage = this._element.querySelector('.element__image');

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleImageElement.textContent = this._name;

    if (this._id === this._cardOwnerId) {
      this._cardDeleteButton.classList.add('element__delete_visible');
    }

    this.sumUpLikes(this._likes);
    this._handleLikeClick();

    this._setEventListeners();

    return this._element;
  }

  //Методы для постановки/снятия лайков
  sumUpLikes(likes) {
      this._likeAmount.textContent = likes.length;
  }

  _handleLikeClick() {
    this._likes.forEach((like) => {
      if (this._id === like._id) {
        this._cardLikeButton.classList.toggle('element__like_active')
      }
    });
  }

  likeAdded() {
    this._cardLikeButton.classList.add('element__like_active');
  }

  likeCanceled() {
    this._cardLikeButton.classList.remove('element__like_active');
  }

  //Метод для удаления карточки
  delete() {
    this._element.remove();
    this._element = null;
  }

  //"Слушатели" событий для лайка, удаления и открытия изображения
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
      }); 

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeletingSubmit(this);
    });

    this._cardLikeButton.addEventListener('click', () => {
      if (this._cardLikeButton.classList.contains('element__like_active')) {
        this._handleRemoveLike();
      } else {
        this._handleAddLike();
      }
    });
  }
}