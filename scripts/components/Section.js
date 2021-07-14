export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedArray = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderedArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

