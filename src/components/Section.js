export default class Section {
  //Принимает в конструктор массив данных, функцию отрисовки данных на странице и селектор контейнера для элементов
  constructor({ items, renderer }, cardsList) {
    this._renderedItems = items; 
    this._renderer = renderer;
    this._container = cardsList;
  }

  addItem(item) {
    //Добавляем item в контейнер на странице
    this._container.prepend(item);
  }

  //Переберем массив данных, которые добавляются на страницу
  renderItem() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}