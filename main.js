(()=>{"use strict";const e=document.querySelector(".popup_open-image"),t=(document.querySelector(".popup__image-element"),document.querySelector(".popup__place-title"),document.querySelectorAll(".popup"),document.querySelector(".profile__add")),s=document.querySelector(".popup_add-card"),n=document.querySelector(".profile__edit"),i=document.querySelector(".popup_profile"),o=document.querySelector(".popup__input_name"),r=document.querySelector(".profile__title"),l=document.querySelector(".popup__input_about"),c=document.querySelector(".profile__subtitle"),p=document.querySelector(".popup__form_profile"),a=(document.querySelector(".popup__input_place"),document.querySelector(".popup__input_link"),document.querySelector(".popup__form_new-card")),u=document.querySelector(".elements__list"),_={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorVisibleClass:"popup__error-visible"};class d{constructor(e,t,s){this._place=e.place,this._link=e.link,this._cardSelector=t,this._handleCardClick=s}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}generateCard(){return this._element=this._getTemplate(),this._imageElement=this._element.querySelector(".element__image"),this._titleImageElement=this._element.querySelector(".element__title"),this._setEventListeners(),this._imageElement.src=this._link,this._imageElement.alt=this._place,this._titleImageElement.textContent=this._place,this._element}_setEventListeners(){this._likeButton=this._element.querySelector(".element__like"),this._cardImage=this._element.querySelector(".element__image"),this._likeButton.addEventListener("click",(()=>{this._handleLikeClick()})),this._element.querySelector(".element__delete").addEventListener("click",(()=>{this._handleDeleteClick()})),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._place,this._link)}))}_handleLikeClick(){this._likeButton.classList.toggle("element__like_active")}_handleDeleteClick(){this._element.remove(),this._element=null}}class h{constructor(e,t){this._formElement=e,this._config=t,this._inputList=Array.from(e.querySelectorAll(this._config.inputSelector)),this._submitButtonElement=e.querySelector(this._config.submitButtonSelector)}_hideInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.remove(this._config.inputErrorClass),t.classList.remove(this._config.errorVisibleClass),t.textContent=""}_showInputError(e,t){const s=this._formElement.querySelector(`#${e.id}-error`);e.classList.add(this._config.inputErrorClass),s.textContent=t,s.classList.add(this._config.errorVisibleClass)}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_toggleButtonState(){this._hasInvalidInput()?this._submitButtonElement.disabled=!0:this._submitButtonElement.disabled=!1}disabledSubmitButton(){this._submitButtonElement.disabled=!0}_setEventListeners(){this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}resetValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}class m{constructor(e){this._popup=e,this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._popup.addEventListener("mousedown",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close"))&&this.close()}))}}class y extends m{constructor(e,t){super(e),this._form=this._popup.querySelector(".popup__form"),this._inputs=this._form.querySelectorAll(".popup__input"),this._submitForm=t}_getInputValues(){const e={};return this._inputs.forEach((t=>{e[t.name]=t.value})),e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._submitForm(this._getInputValues()),this.close()}))}close(){super.close(),this._form.reset()}}const E=new class{constructor({userName:e,userAbout:t}){this._name=e,this._about=t}getUserInfo(){return{name:this._name.textContent,about:this._about.textContent}}setUserInfo(e){this._name.textContent=e.name,this._about.textContent=e.about}}({userName:r,userAbout:c});n.addEventListener("click",(()=>{g.open();const e=E.getUserInfo();o.value=e.name,l.value=e.about,L.resetValidation(),L.disabledSubmitButton()}));const g=new y(i,(e=>{E.setUserInfo(e),console.log(e)}));g.setEventListeners();const v=(e,t)=>{k.open(e,t)},k=new class extends m{constructor(e){super(e),this._place=this._popup.querySelector(".popup__place-title"),this._link=this._popup.querySelector(".popup__image-element")}open(e,t){this._link.src=t,this._link.alt=e,this._place.textContent=e,super.open()}}(e);k.setEventListeners(),t.addEventListener("click",(()=>{b.open(),q.resetValidation()}));const S=e=>new d(e,".element-template",v).generateCard(),f=new class{constructor({items:e,renderer:t},s){this._renderedItems=e,this._renderer=t,this._container=s}addItem(e){this._container.prepend(e)}renderItem(){this._renderedItems.forEach((e=>{this._renderer(e)}))}}({items:[{place:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{place:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{place:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{place:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{place:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{place:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:e=>{const t=S(e);f.addItem(t)}},u);f.renderItem();const b=new y(s,(e=>{const t=S(e);console.log(e),f.addItem(t),b.close()}));b.setEventListeners();const L=new h(p,_),q=new h(a,_);L.enableValidation(),q.enableValidation()})();