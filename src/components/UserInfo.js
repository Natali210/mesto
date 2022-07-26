export default class UserInfo {
  //Принимает объект с селекторами элементов "имя" и "о себе"
  constructor({ userName, userAbout }) {
    this._name = userName;
    this._about = userAbout;
  }

  //Метод, возвращающий объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent
    }
    return userInfo;
  }

  //Метод, принимающий новые данные пользователя и добавляющий на страницу
  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
  }
}