import Todo from "./todo";
import { toDate, format, isToday, isThisWeek } from "date-fns";

export default class Project {
  constructor (title) {
    this._title = title;
    this.projectId = crypto.randomUUID();
    this._todoList = [];
  }

  set todoList(newTodoList) {
    this._todoList = newTodoList;
  }

  get todoList() {
    return this._todoList;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get title() {
    return this._title;
  }

  getTodoList() {
    return this.todoList;
  }

  setTodoList(newTodoList) {
    this.todoList = newTodoList;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get title() {
    return this._title;
  }

  hasTodo(todoTitle) {
    return this._todoList.some(todo => todo._title === todoTitle);
  }
  
  addTodo (title, description, dueDate, priority) {
    this.todoList.push(new Todo(title, description, dueDate, priority))
  }

  removeTodo (title) {
    let todoIndex = this.todoList.findIndex(todo => todo._title === title);
    if (todoIndex !== -1) {
      this.todoList.splice(todoIndex, 1);
    }
  }

  filterTodosToday() {
    return this.todoList.filter((todo) => {
      const dueDate = new Date(todo._dueDate);
      return isToday(dueDate);
    })
  }

  filterTodosThisWeek() {
    return this.todoList.filter((todo) => {
      const dueDate = new Date(todo._dueDate);
      return isThisWeek(dueDate);
    })
  }
}

