export default class UserInfo {
  //Принимает объект с селекторами элементов "имя", "о себе", "аватар"
  constructor({ userName, userAbout, userAvatar }) {
    this._name = userName;
    this._about = userAbout;
    this._avatar = userAvatar;
  }

  //Метод, возвращающий объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    }
    return userInfo;
  }

  //Метод, принимающий новые данные пользователя и добавляющий на страницу
  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
    this._avatar.src = userInfo.avatar;
  }
}