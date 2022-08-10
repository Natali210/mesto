export default class Card {
  constructor(data, cardSelector, handleCardClick, {userId}, handleDeletingSubmit) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._id = userId;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._handleDeletingSubmit = handleDeletingSubmit;
    this._data = data;
  }

  //Получить карточку
  getCard() {
    return this._data;
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
    this._setEventListeners();

    //Добавление данных
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleImageElement.textContent = this._name;

    //Проверка автора карточки
    if (this._id !== this._cardOwnerId) {
      this._cardDeleteButton.style.display = "none";
    }
    
    this._setEventListeners();
    return this._element;
  }

  //"Слушатели" событий для лайка, удаления и открытия изображения
  _setEventListeners() {
    
    //Объявление классовых переменных для лайка и изображений
    this._likeButton = this._element.querySelector('.element__like');
    this._cardImage = this._element.querySelector('.element__image');

    this._likeButton.addEventListener('click', () => {
    this._handleLikeClick();
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeletingSubmit(this._data, this._element);
    });

    this._cardImage.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
    }); 
  }

  //Методы для лайка, удаления карточки
  _handleLikeClick() {
    this._likeButton.classList.toggle('element__like_active');
  }

  delete() {
    this._element.remove();
    this._element = null;
  }
}