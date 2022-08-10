import Popup from './Popup.js';

export default class PopupForConfirm extends Popup {
  constructor (allPopups, { submitForm }) {
    super(allPopups);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  //Функция обработки подтверждения удаления
  setSubmitAction ({ handleSubmitAction }) {
    this.submitAction = handleSubmitAction;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._card);
    });
  }
}