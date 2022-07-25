import { 
  initialCards,
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

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

//Cохранение заполненной формы редактирования профиля
const handleProfilePopup = (userData) => {
  profileInfo.setUserInfo(userData);
  console.log(profileInfo);
  console.log(userData);
};

//"Слушатель" для открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  profilePopup.open();
  const profileInputValues = profileInfo.getUserInfo();
  nameField.value = profileInputValues.name;
  aboutField.value = profileInputValues.job;
  formProfileValidation.resetValidation();
});

//Создание экземпляра класса PopupWithForm для попапа профиля
const profilePopup = new PopupWithForm(popupProfile, handleProfilePopup);
profilePopup.setEventListeners();

//Отображение добавленной информации о пользователе на странице, их перезапись
const profileInfo = new UserInfo({
  userName: profileTitle,
  userJob: profileSubtitle,
});

//Открытие попапа с изображением
const openImage = (name, link) => {
  imagePopup.open(name, link);
}

//Создание экземпляра класса PopupWithImage для попапа с изображениями
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

//"Слушатель" для открытия попапа добавления карточки
addCardButton.addEventListener('click', () => {
  newCardPopup.open();
  formCardValidation.resetValidation();
  //formElementCard.reset();
})

//Создание новых карточек мест
const createCard = (data) => {
  const card = new Card(data, '.element-template', openImage);
  const cardElement = card.generateCard();
  return cardElement;
  //console.log(cardElement);
};

//"Отрисовка" элементов на странице
const cardList = new Section({ items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
    },
  }, 
  cardsList 
  );

cardList.renderItem();
console.log(cardList);

//Создание карточки из заполненной формы
const handlerCardSubmit = (data) => {
  const cardElement = createCard(data);
  cardList.addItem(cardElement);
  newCardPopup.close();
};

//Создание экземпляра класса PopupWithForm для попапа с карточками
const newCardPopup = new PopupWithForm(popupAddCard, handlerCardSubmit);
newCardPopup.setEventListeners();


//Валидация
const formProfileValidation = new FormValidator(formElementProfile, config);
const formCardValidation = new FormValidator(formElementCard, config);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();