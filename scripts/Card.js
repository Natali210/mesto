import { imageElement, captionElement, openPopup, popupImage } from './index.js';

class Card {
  constructor(data){
    this._name = data.name;
    this._link = data.link;
  }

  //Функция, чтобы возвращать разметку и клонировать элемент
  _getTemplate(){
    const cardElement = document
    .querySelector('.element-template')
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
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  //Методы для лайка, удаления карточки и открытия изображения
  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _openImageClick() {
      imageElement.src = this._link;
      imageElement.alt = this._name;
      captionElement.textContent = this._name;
      return openPopup(popupImage);
  };

  //"Слушатели" событий для лайка, удаления и открытия изображения
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
    this._handleLikeClick();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
    this._handleDeleteClick();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
    this._openImageClick();
    }); 
  }
}

export default Card;