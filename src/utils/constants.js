export const popupImage = document.querySelector('.popup_open-image');
export const imageElement = document.querySelector('.popup__image-element');
export const captionElement = document.querySelector('.popup__place-title');
export const allPopups = document.querySelectorAll('.popup');
export const addCardButton = document.querySelector('.profile__add');
export const popupAddCard = document.querySelector('.popup_add-card');
export const profileEditButton = document.querySelector('.profile__edit');
export const popupProfile = document.querySelector('.popup_profile');
export const nameField = document.querySelector('.popup__input_name');
export const profileTitle = document.querySelector('.profile__title');
export const aboutField = document.querySelector('.popup__input_about');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const formElementProfile = document.querySelector('.popup__form_profile');
export const placeField = document.querySelector('.popup__input_place');
export const linkField = document.querySelector('.popup__input_link');
export const formElementCard = document.querySelector('.popup__form_new-card');
export const cardsList = document.querySelector('.elements__list');
export const popupAvatar = document.querySelector('.popup_new-avatar');
export const newAvatarButton = document.querySelector('.profile__avatar-overlay');
export const profileAvatar = document.querySelector('.profile__avatar');
export const popupConfirm = document.querySelector('.popup_confirm');
export const popupAvatarForm = document.querySelector('.popup__form_new-avatar');
export const formValidators = {};
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__error-visible',
  host: 'https://mesto.nomoreparties.co/v1/cohort-47',
  token: 'f085916c-6915-4c31-bcde-3cb49b2623b6',
};