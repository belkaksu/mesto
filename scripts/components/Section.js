export default class Section {
  constructor({ item, renderer }, containerSelector) {
    this._renderedArray = item;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

}


