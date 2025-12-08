class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items; // an array of data
    this._renderer = renderer; // funtion for adding single item to page
    this._container = document.querySelector(containerSelector); // selector for the to-do elements
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemFromData(data) {
    this._renderer(data);
  }
}

export default Section;
