import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  //Принимает в конструктор селектор попапа и колбэк сабмита формы
  constructor (allPopups, { submitForm }) {
    super(allPopups);
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._submitForm = submitForm;
    this._cardSubmitButton = this._popup.querySelector('.popup__button');
    this._cardSubmitButtonContent = this._cardSubmitButton.textContent;
  }

  //Метод, который собирает данные всех полей формы
  _getInputValues() {
    const values = {};
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  //Уведомление пользователя о процессе загрузки
  downloadInfo(download, text) {
    if (download) {
      this._cardSubmitButton.textContent = text;
    } else {
      setTimeout(() => {
        this._cardSubmitButton.textContent = this._cardSubmitButtonContent;
      }, 600);
    }
  }

  //Метод, добавляющий обработчик клика "крестику" и сабмиту формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  //Метод сброса полей при закрытия попапа (перезапись родительского закрытия попапа)
  close() {
    super.close();
    this._form.reset();
  }
}