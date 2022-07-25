export default class UserInfo {
  //Принимает объект с селекторами элементов "имя" и "о себе"
  constructor({ userName, userJob }) {
    this._name = userName;
    this._job = userJob;
    //console.log(this._name);
    //console.log(this._job);
  }

  //Метод, возвращающий объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    }
    return userInfo;
    console.log(userInfo);
  }

  //Метод, принимающий новые данные пользователя и добавляющий на страницу
  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._job.textContent = userInfo.job;
  }
}