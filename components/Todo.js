class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._handeRemove();
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  _generateNameEl() {
    this._nameEl = this._element.querySelector(".todo__name");
    this._nameEl.textContent = this._name;
  }

  _getDate() {
    this._dateEl = this._element.querySelector(".todo__date");
    const dueDate = new Date(this._date);

    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._element.querySelector(".todo__completed");
    this._todoLabel = this._element.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  _toggleCompletion() {
    this._completed = !this._completed;
  }

  _handeRemove() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();
    this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");
    this._generateNameEl();
    this._getDate();
    this._generateCheckboxEl();
    this._setEventListeners();

    return this._element;
  }
}

export default Todo;
