import { imageElement, captionElement, openPopup, popupImage } from './index.js';

class Card {
  constructor(data, cardSelector){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  //Функция, чтобы возвращать разметку и клонировать элемент
  _getTemplate(){
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
    this._setEventListeners();

    //Добавление данных
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

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

    this._element.querySelector('.element__delete').addEventListener('click', () => {
    this._handleDeleteClick();
    });

    this._cardImage.addEventListener('click', () => {
    this._openImageClick();
    }); 
  }

  //Методы для лайка, удаления карточки и открытия изображения
  _handleLikeClick() {
    this._likeButton.classList.toggle('element__like_active');
  }
  
  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }
  
  _openImageClick() {
    imageElement.src = this._link;
    imageElement.alt = this._name;
    captionElement.textContent = this._name;
    return openPopup(popupImage);
  };
}

export default Card;