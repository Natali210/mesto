//Скрыть ошибку
const hideInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorVisibleClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorVisibleClass);
  errorElement.textContent = '';
}

//Показать ошибку
const showInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorVisibleClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorVisibleClass);
}

//Проверить валидность поля и показать или скрыть ошибку в зависимости от результата
const checkInputValidity = (formElement, inputElement, config) => {
  console.log();
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

//Проверить, нет ли полей с некорректными данными и в зависимости от этого сделать кнопку активной или нет
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (buttonElement, inputList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
} 

//Найти все поля и кнопку подтверждения, добавить "слушатели"
const setEventListeners = (formElement, config) => {
  const { inputSelector, submitButtonSelector, ...restConfig } = config;
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, restConfig);
      toggleButtonState(buttonElement, inputList);
    }); 
  })

  toggleButtonState(buttonElement, inputList);
}

//Найти все формы, поставить им слушатели
const enableValidation = (config) => {
  const { formSelector, ...restConfig } = config;
  const formList = Array.from(document.querySelectorAll(formSelector));
  
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig);
  });
}