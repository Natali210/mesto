const editButton = document.querySelector('.profile__edit')
const popup = document.querySelector('.popup')
const closePopupButton = document.querySelector('.popup__close')
const nameField = document.querySelector('.popup__form-item_field_name')
const profileTitle = document.querySelector('.profile__title')
const aboutField = document.querySelector('.popup__form-item_field_about') 
const profileSubtitle = document.querySelector('.profile__subtitle')
const formElement = document.querySelector('.popup__form')

//Функция для открытия попапа через кнопку "Редактировать"
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  nameField.value = profileTitle.textContent;
  aboutField.value = profileSubtitle.textContent;
}

//Функция для закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
}

//Функция для сохранения заполненной формы
function submitPopup(event) {
  event.preventDefault()
  profileTitle.textContent = nameField.value;
  profileSubtitle.textContent = aboutField.value;
  closePopup(popup)
}

editButton.addEventListener('click', function() {
  openPopup(popup)
})

closePopupButton.addEventListener('click', function() {
  closePopup(popup)
})

formElement.addEventListener('submit', submitPopup);