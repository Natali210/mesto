import './../pages/index.css';

import {
  addCardButton,
  popupAddCard,
  profileEditButton,
  popupProfile,
  profileTitle,
  profileSubtitle,
  cardsList,
  popupImage,
  config,
  formElementProfile,
  formElementCard,
  popupAvatar,
  newAvatarButton,
  profileAvatar,
  popupConfirm,
  popupAvatarForm
} from '../utils/constants.js';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupForConfirm from '../components/PopupForConfirm.js';

let userId;

//Создание экземляра класса для получения данных с сервера
const api = new Api(config.host, config.token);

//Получение данных с сервера
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, items]) => {
    userId = userData._id;
    profileInfo.setUserInfo(userData);
    cardList.setItems(items);
    cardList.renderItem(items);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

//Создание экземпляра класса UserInfo для отображения информации о пользователе 
const profileInfo = new UserInfo({
  userName: profileTitle,
  userAbout: profileSubtitle,
  userAvatar: profileAvatar,
});

//Создание экземпляра класса PopupWithForm для попапа профиля
const profilePopup = new PopupWithForm(popupProfile, { submitForm: handleProfilePopup });
profilePopup.setEventListeners();

//Cохранение заполненной формы редактирования профиля
function handleProfilePopup(userData) {
  profilePopup.downloadInfo(true, 'Сохранение...');
  api.setProfileInfo(userData)
    .then((res) => {
      profileInfo.setUserInfo(res);
      profilePopup.close();
    })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => profilePopup.downloadInfo(false))
}

//"Слушатель" для открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  profilePopup.open();
  const profileInputValues = profileInfo.getUserInfo();
  profilePopup.setInputValues(profileInputValues);
  formProfileValidation.resetValidation();
  formProfileValidation.disabledSubmitButton();
});

//Создание экземпляра класса PopupWithForm для попапа изменения аватара
const newAvatarPopup = new PopupWithForm(popupAvatar, { submitForm: handleAvatarSubmit });
newAvatarPopup.setEventListeners();

//"Слушатель" для открытия попапа изменения аватара
newAvatarButton.addEventListener('click', () => {
  newAvatarPopup.open();
  formAvatarValidator.resetValidation();
})

//Cохранение заполненной формы изменения аватара
function handleAvatarSubmit(data) {
  newAvatarPopup.downloadInfo(true, 'Сохранение...');
  api.addNewAvatar(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      newAvatarPopup.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => profilePopup.downloadInfo(false))
  }

//Создание новых карточек мест
const createCard = (data) => {
  const card = new Card(data, '.element-template', handleCardClick, {
    userId: userId,
    handleDeletingSubmit: () => {
      deletingPopup.open(data);
      deletingPopup.setSubmitAction({
        handleSubmitAction: () => {
          api.deleteCard(data)
            .then(() => {
              deletingPopup.close();
              card.delete();
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
        }
      });
    },
    
    handleAddLike: () => {
      api.putLike(data)
      .then((res) => {
        card.sumUpLikes(res.likes);
        card.likeAdded();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
    },

    handleRemoveLike: () => {
      api.removeLike(data)
      .then((res) => {
        card.sumUpLikes(res.likes);
        card.likeCanceled();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
    }
  });

  const cardElement = card.generateCard();
  return cardElement;
}

//Создание экземпляра класса Section для отрисовки карточек на странице
const cardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  },
},
  cardsList
);

//Создание экземпляра класса PopupWithForm для попапа с карточками
const newCardPopup = new PopupWithForm(popupAddCard, { submitForm: handlerCardSubmit });
newCardPopup.setEventListeners();

//"Слушатель" для открытия попапа добавления карточки
addCardButton.addEventListener('click', () => {
  newCardPopup.open();
  formCardValidation.resetValidation();
})

//Создание карточки из заполненной формы
function handlerCardSubmit(data) {
  newCardPopup.downloadInfo(true, 'Сохранение...');
  api.addCard(data)
    .then((res) => {
      const cardElement = createCard(res);
      cardList.addItem(cardElement);
      newCardPopup.close();
    })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => profilePopup.downloadInfo(false))
}

//Создание экземпляра класса PopupWithForm для попапа подтверждения удаления
const deletingPopup = new PopupForConfirm(popupConfirm, { submitForm: () => deletingPopup.submitAction(), });

deletingPopup.setEventListeners();

//Создание экземпляра класса PopupWithImage для попапа с изображениями
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

//Открытие попапа с изображением
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}

//Валидация
const formProfileValidation = new FormValidator(formElementProfile, config);
const formCardValidation = new FormValidator(formElementCard, config);
const formAvatarValidator = new FormValidator(popupAvatarForm, config);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();
formAvatarValidator.enableValidation();