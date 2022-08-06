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

//Отображение добавленной информации о пользователе на странице, их перезапись
const profileInfo = new UserInfo({
  userName: profileTitle,
  userAbout: profileSubtitle,
});

//Cохранение заполненной формы редактирования профиля
const handleProfilePopup = (userData) => {
  profileInfo.setUserInfo(userData);
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





//Создание экземляра класса для карточек с сервера
const api = new Api(config.host, config.token);

//Создание новых карточек мест
const createCard = (data) => {
  const card = new Card(data, '.element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

//Получение карточек с сервера
api.getCards()
  //Когда сервер дал карточки, начинаем их отрисовывать
  .then((items) => {
    const cardList = new Section({ items,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
        },
      }, 
      cardsList 
      );
    cardList.renderItem();

//Создание экземпляра класса PopupWithForm для попапа с карточками
const newCardPopup = new PopupWithForm(popupAddCard, handlerCardSubmit);
newCardPopup.setEventListeners();

//"Слушатель" для открытия попапа добавления карточки
addCardButton.addEventListener('click', () => {
  newCardPopup.open();
  formCardValidation.resetValidation();
})

//Создание карточки из заполненной формы
const handlerCardSubmit = (data) => {
  const cardElement = createCard(data);
  cardList.addItem(cardElement);
  newCardPopup.close();
};
  });

//Открытие попапа с изображением
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}

//Создание экземпляра класса PopupWithImage для попапа с изображениями
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();







//Валидация
const formProfileValidation = new FormValidator(formElementProfile, config);
const formCardValidation = new FormValidator(formElementCard, config);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();