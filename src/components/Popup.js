export default class Popup {
  //Принимает в конструктор селектор попапа
  constructor(allPopups) {
    this._popup = allPopups;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  
  //Функция для открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  //Функция для закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Закрытие попапа через esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //Закрытие попапов кликом на оверлей и "крестик"
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
        if (
          evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('popup__close')
        ) {
          this.close();
        }
      });
  }
}