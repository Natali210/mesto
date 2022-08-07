import './../pages/index.css';

import {
  addCardButton,
  popupAddCard,
  profileEditButton,
  popupProfile,
  nameField,
  profileTitle,
  aboutField,
  profileSubtitle,
  cardsList,
  popupImage,
  config,
  formElementProfile,
  formElementCard
} from '../utils/constants.js';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

//Создание экземляра класса для получения данных с сервера
const api = new Api(config.host, config.token);

//Получение данных с сервера
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, items]) => {
    profileInfo.setUserInfo(userData);
    cardList.setItems(items);
    cardList.renderItem(items);
  })
  .catch((err) => console.log(err));

const profileInfo = new UserInfo({
  userName: profileTitle,
  userAbout: profileSubtitle,
});

//Cохранение заполненной формы редактирования профиля
async function handleProfilePopup(userData) {
  try {
    const res = await api.setProfileInfo(userData);
    profileInfo.setUserInfo(res);
    profilePopup.close();
  }
  catch(error) {
    console.log(error);
  }
};

//"Слушатель" для открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  profilePopup.open();
  const profileInputValues = profileInfo.getUserInfo();
  nameField.value = profileInputValues.name;
  aboutField.value = profileInputValues.about;
  formProfileValidation.resetValidation();
  formProfileValidation.disabledSubmitButton();
});

//Создание экземпляра класса PopupWithForm для попапа профиля
const profilePopup = new PopupWithForm(popupProfile, handleProfilePopup);
profilePopup.setEventListeners();

//Создание новых карточек мест
const createCard = (data) => {
  const card = new Card(data, '.element-template', handleCardClick, deleteCard);
  const cardElement = card.generateCard();
  return cardElement;
};

//Выносим cardList в общую зону видимости
const cardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
    },
  }, 
  cardsList 
  );

//Создание экземпляра класса PopupWithForm для попапа с карточками
const newCardPopup = new PopupWithForm(popupAddCard, handlerCardSubmit);
newCardPopup.setEventListeners();

//"Слушатель" для открытия попапа добавления карточки
addCardButton.addEventListener('click', () => {
  newCardPopup.open();
  formCardValidation.resetValidation();
})

//Создание карточки из заполненной формы
async function handlerCardSubmit(data) {
  try {
    const res = await api.addCard(data);
    const cardElement = createCard(res);
    cardList.addItem(cardElement);
    newCardPopup.close();
  }
  catch(error) {
    console.log(error);
  }
};

//Открытие попапа с изображением
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}

//Создание экземпляра класса PopupWithImage для попапа с изображениями
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

//Удаление карточки
function deleteCard(id) {
  return api.deleteCard(id);
}





//Валидация
const formProfileValidation = new FormValidator(formElementProfile, config);
const formCardValidation = new FormValidator(formElementCard, config);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();