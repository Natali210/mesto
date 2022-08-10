export default class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;
    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  //Получение Headers для различных методов
  _getHeaders() {
    return {
      authorization: this._token,
      'content-type': 'application/json',
    }
  }

  //Ответ в промисах различных методов в зависимости от наличия ошибки
  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }

    throw new Error(`Ошибка: ${res.status}`);
  }

  //Метод, который вернет информацию о пользователе
  getUserInfo(){
    return fetch(`${this._host}/users/me`, {
      headers: this._getHeaders(),
    })
    .then(this._getJsonOrError)
  }

  //Метод, который сохранит измененные данные о пользователе
  setProfileInfo(data){
    return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then(this._getJsonOrError)
  }

  //Метод, который сохранит измененные данные о пользователе
  setNewAvatar(data){
    return fetch(`${this._host}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    .then(this._getJsonOrError)
  }

  //Метод, который вернет карточки
  getCards(){
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders(),
    })
    .then(this._getJsonOrError)
  }

  //Метод, добавляющий карточки
  addCard(name) {
    return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify((name)),
    })
    .then(this._getJsonOrError)
  }

  //Метод, удаляющий карточки
  deleteCard(data) {
    return fetch(`${this._host}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._getJsonOrError)
  }

    //Метод, собирающий лайки
  putLike(data) {
    return fetch(`${this._host}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
    .then(this._getJsonOrError)
  }

    //Метод, удаляющий лайк
  removeLike(data) {
    return fetch(`${this._host}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._getJsonOrError)
  }
}