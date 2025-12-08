import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  handleTotalDelete();
}

function handleTotal() {
  todoCounter.updateTotal(true);
}

function handleTotalDelete() {
  todoCounter.updateTotal(false);
}

const section = new Section({
  items: initialTodos, // pass initial todos
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
    const renderEl = todo.getView();
    section.addItem(renderEl);
  },
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    if (!addTodoForm.checkValidity()) {
      return;
    }

    const todoName = inputValues["name"];
    const dateInput = inputValues["date"];

    // Create a date object and adjust for timezone
    const todoDate = new Date(dateInput);
    todoDate.setMinutes(todoDate.getMinutes() + todoDate.getTimezoneOffset());

    const todoId = uuidv4();
    const values = { name: todoName, date: todoDate, id: todoId };
    section.addItemFromData(values);
    handleTotal();
    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();
