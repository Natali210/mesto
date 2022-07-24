export default class UserInfo {
  //Принимает объект с селекторами элементов "имя" и "о себе"
  constructor({ userName, userAbout }) {
    this._userName = userName;
    this._userAbout = userAbout;
  }

  //Метод, возвращающий объект с данными пользователя
  getUserInfo() {
    this._userInfoValues = {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
    };

    return this._userInfoValues;
  }

  //Метод, принимающий новые данные пользователя и добавляющий на страницу
  setUserInfo(data) {
    this._userName.textContent = data.userName;
    this._userAbout.textContent = data.userAbout;
  }
}