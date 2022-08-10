import Popup from './Popup.js';

export default class PopupForConfirm extends Popup {
  constructor (allPopups, submitForm) {
    super(allPopups);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  open(data, card) {
    this._data = data;
    this._card = card;
    super.open();
  }

//Получить объект карточки
  getCardObject(data) {
    this._data = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._data);
    });
  }
}