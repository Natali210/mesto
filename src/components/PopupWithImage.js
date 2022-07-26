import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(allPopups) {
    super(allPopups);
    this._place = this._popup.querySelector('.popup__place-title');
    this._link = this._popup.querySelector('.popup__image-element');
  }
  
  //Перезапись родительского метода для открытия
  open(place, link) {
    this._link.src = link;
    this._link.alt = place;
    this._place.textContent = place;
    super.open();
  }
}