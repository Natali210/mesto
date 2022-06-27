const placeField = document.querySelector('.popup__input_place');
const linkField = document.querySelector('.popup__input_link');
const formElementCard = document.querySelector('.popup__form_new-card');
const profileEditButton = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('.popup_profile');
const closePopupProfile = document.querySelector('.popup__close_profile');
const closePopupAddCard = document.querySelector('.popup__close_add-card');
const closePopupImage = document.querySelector('.popup__close_open-image');
const nameField = document.querySelector('.popup__input_name');
const profileTitle = document.querySelector('.profile__title');
const aboutField = document.querySelector('.popup__input_about');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formElementProfile = document.querySelector('.popup__form_profile');
const popupAddCard = document.querySelector('.popup_add-card');
const addCardButton = document.querySelector('.profile__add');
const popupImage = document.querySelector('.popup_open-image');
const captionFieldElement = document.querySelector('.popup__place-title');
const imageFieldElement = document.querySelector('.popup__image-element');
const allPopups = document.querySelectorAll('.popup');
const buttonElementSubmit = formElementCard.querySelector('.popup__button');

//Закрыть попап кликом на оверлей
allPopups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__button-close')
    ) {
      closePopup(popup);
    }
  });
});

//Закрыть попап по Esc
const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

//Открыть попап
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
};

//Закрыть попап
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
};

//Cохранить заполненную форму "Редактировать профиль"
function handleProfilePopup(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameField.value;
  profileSubtitle.textContent = aboutField.value;
  closePopup(popupProfile);
};

//Слушатели для закрытия попапов
closePopupProfile.addEventListener('click', function () {
  closePopup(popupProfile);
})

closePopupImage.addEventListener('click', function () {
  closePopup(popupImage);
})

closePopupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
})

formElementProfile.addEventListener('submit', handleProfilePopup);

//Открытие каждого из попапов
addCardButton.addEventListener('click', function () {
  openPopup(popupAddCard);
})

profileEditButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameField.value = profileTitle.textContent;
  aboutField.value = profileSubtitle.textContent;
});

const openImageCardPopup = (element) => {
  imageFieldElement.src = element.link;
  imageFieldElement.alt = element.name;
  captionFieldElement.textContent = element.name;
  openPopup(popupImage);
};

//Создать новые карточки мест
const cardTemplate = document.querySelector('#element-template').content;

const createCard = (element) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');

  cardElement.querySelector('.element__title').textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__delete').addEventListener('click', (evt) => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    openImageCardPopup(element);
  });

  return cardElement;
};

const addCard = (element) => {
  const newCard = createCard(element);
  const cardList = document.querySelector('.elements__list');

  cardList.prepend(newCard);
};

//Сохранить заполненную форму "Новое место"
const handlePopupCard = (evt) => {
  evt.preventDefault();

  const card = {
    name: placeField.value,
    link: linkField.value,
  };

  addCard(card);
  closePopup(popupAddCard);
  formElementCard.reset();

  buttonElementSubmit.classList.add('popup__button_disabled');
  buttonElementSubmit.setAttribute('disabled', true);
};

initialCards.forEach(addCard);
formElementCard.addEventListener('submit', handlePopupCard);

//Config для валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__error_visible'
});