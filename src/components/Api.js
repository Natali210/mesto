export default class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;
  }

  //Метод, который вернет карточки
  getCards(){
    return fetch(`${this._host}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Ошибка: ${res.status}`);
    })
  }
}