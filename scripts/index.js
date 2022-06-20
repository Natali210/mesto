const placeField = document.querySelector('.popup__form-item_field_place');
const linkField = document.querySelector('.popup__form-item_field_image-link');
const formElementCard = document.querySelector('.popup__form_new-card');
const profileEditButton = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('.popup_profile');
const closePopupProfile = document.querySelector('.popup__close_profile');
const closePopupAddCard = document.querySelector('.popup__close_add-card');
const closePopupImage = document.querySelector('.popup__close_open-image');
const nameField = document.querySelector('.popup__form-item_field_name');
const profileTitle = document.querySelector('.profile__title');
const aboutField = document.querySelector('.popup__form-item_field_about');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formElementProfile = document.querySelector('.popup__form_profile');
const popupAddCard = document.querySelector('.popup_add-card');
const addCardButton = document.querySelector('.profile__add');
const popupImage = document.querySelector('.popup_open-image');
const captionFieldElement = document.querySelector('.popup__place-title');
const imageFieldElement = document.querySelector('.popup__image-element');

//Функция для открытия попапа "Редактировать профиль" 
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  nameField.value = profileTitle.textContent;
  aboutField.value = profileSubtitle.textContent;
};

//Функция для закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};

//Функция для сохранения заполненной формы "Редактировать профиль"
function handleProfilePopup(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameField.value;
  profileSubtitle.textContent = aboutField.value;
  closePopup(popupProfile);
};

//Действия с формой "Редактировать профиль"
profileEditButton.addEventListener('click', function () {
  openPopup(popupProfile);
});

closePopupProfile.addEventListener('click', function () {
  closePopup(popupProfile);
})

closePopupImage.addEventListener('click', function () {
  closePopup(popupImage);
})

formElementProfile.addEventListener('submit', handleProfilePopup);

//Действия с формой "Добавить карточку места"
addCardButton.addEventListener('click', function () {
  openPopup(popupAddCard);
})

closePopupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
})

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

const openImageCardPopup = (element) => {
  imageFieldElement.src = element.link;
  imageFieldElement.alt = element.name;
  captionFieldElement.textContent = element.name;
  openPopup(popupImage);
};

const addCard = (element) => {
  const newCard = createCard(element);
  const cardList = document.querySelector('.elements__list');

  cardList.prepend(newCard);
};

//Функция для сохранения заполненной формы "Новое место"
const handlePopupCard = (evt) => {
  evt.preventDefault();

  const card = {
    name: placeField.value,
    link: linkField.value,
  };

  addCard(card);
  closePopup(popupAddCard);
  formElementCard.reset();
};

initialCards.forEach(addCard);
formElementCard.addEventListener('submit', handlePopupCard);