export const initialCards = [
    {
      place: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      place: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      place: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      place: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      place: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      place: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
  ];

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

//Config для валидации
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__error-visible'
};