import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(allPopups) {
    super(allPopups);
    this._name = this._popup.querySelector('.popup__place-title');
    this._link = this._popup.querySelector('.popup__image-element');
  }
  
  //Перезапись родительского метода для открытия
  open(name, link) {
    this._link.src = link;
    this._link.alt = name;
    this._name.textContent = name;
    super.open();
  }
}