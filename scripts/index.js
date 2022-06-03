const editButton = document.querySelector('.profile__edit')
const popup = document.querySelector('.popup')
const closePopupButton = document.querySelector('.popup__close')
const nameField = document.querySelector('.popup__name-item')
const profileTitle = document.querySelector('.profile__title')
const aboutField = document.querySelector('.popup__about-item') 
const profileSubtitle = document.querySelector('.profile__subtitle')
const formElement = document.querySelector('.popup__edit-form')

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  nameField.value = profileTitle.textContent;
  aboutField.value = profileSubtitle.textContent;
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
}

editButton.addEventListener('click', function() {
  openPopup(popup)
})

closePopupButton.addEventListener('click', function() {
  closePopup(popup)
})

formElement.addEventListener('submit', function(event) {
  event.preventDefault()
  closePopup(popup)
  profileTitle.textContent = nameField.value;
  profileSubtitle.textContent = aboutField.value;
})