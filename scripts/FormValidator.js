class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
    this._inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    this._submitButtonElement = formElement.querySelector(this._config.submitButtonSelector);
  }

  //Метод, скрывающий ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorVisibleClass);
    errorElement.textContent = '';
  }

  //Отображение ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorVisibleClass);
  }

  //Проверка валидности поля, чтобы показать или скрыть ошибку
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Проверка, нет ли полей с некорректными данными
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Метод, позволяющий изменить кнопку (активная или неактивная)
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.disabled = true;
    } else {
      this._submitButtonElement.disabled = false;
    }
  }
  
  //Добавление "слушателей" на все поля и кнопку подтверждения
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      }); 
    })
  
    this._toggleButtonState();
  }

  //Очистка формы от ошибок
  resetValidation() {
    this._inputList.forEach((inputElement) => {
       this._hideInputError(inputElement);
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;