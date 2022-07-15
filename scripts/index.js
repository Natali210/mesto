import { initialCards } from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

export const popupImage = document.querySelector('.popup_open-image');
export const imageElement = document.querySelector('.popup__image-element');
export const captionElement = document.querySelector('.popup__place-title');
const allPopups = document.querySelectorAll('.popup');
const addCardButton = document.querySelector('.profile__add');
const popupAddCard = document.querySelector('.popup_add-card');
const profileEditButton = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('.popup_profile');
const nameField = document.querySelector('.popup__input_name');
const profileTitle = document.querySelector('.profile__title');
const aboutField = document.querySelector('.popup__input_about');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formElementProfile = document.querySelector('.popup__form_profile');
const placeField = document.querySelector('.popup__input_place');
const linkField = document.querySelector('.popup__input_link');
const formElementCard = document.querySelector('.popup__form_new-card');
const submitButtonElement = formElementCard.querySelector('.popup__button');
const cardsList = document.querySelector('.elements__list');

//Функция для открытия попапа
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlEscape);
};

//"Слушатель" для открытия попапа добавления карточки
addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  formCardValidation.resetValidation();
  placeField.value = '';
  linkField.value = '';
})

//"Слушатель" для открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameField.value = profileTitle.textContent;
  aboutField.value = profileSubtitle.textContent;
  formProfileValidation.resetValidation();
});

//Функция для закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlEscape);
};

//Закрытие попапов кликом на оверлей и "крестики"
allPopups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__close')
    ) {
      closePopup(popup);
    }
  });
});

//Закрытие попапа через esc
const handlEscape = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

//Cохранение заполненной формы редактирования профиля
const handleProfilePopup = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameField.value;
  profileSubtitle.textContent = aboutField.value;
  closePopup(popupProfile);
};

formElementProfile.addEventListener('submit', handleProfilePopup);

//Сохранение заполненной формы добавления карточки
const handlePopupCard = (evt) => {
  evt.preventDefault();

  const card = {
    name: placeField.value,
    link: linkField.value,
  };

  addCard(card);
  closePopup(popupAddCard);
  formElementCard.reset();

  submitButtonElement.classList.add('popup__button_disabled');
  submitButtonElement.setAttribute('disabled', true);
};

formElementCard.addEventListener('submit', handlePopupCard);

//Создание новых карточек мест
const createCard = (data) => {
  const card = new Card(data);
  const cardElement = card.generateCard();
  return cardElement;
};

const addCard = (element) => {
  const cardElement = createCard(element);
  cardsList.prepend(cardElement);
};

initialCards.forEach(addCard);

//Config для валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__error-visible'
};

const formProfileValidation = new FormValidator(formElementProfile, config);
const formCardValidation = new FormValidator(formElementCard, config);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();