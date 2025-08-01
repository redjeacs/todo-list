import Todo from "./todo";
import { format, isToday, isThisWeek } from "date-fns";

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
  
  addTodo (title, description, dueDate, priority) {
    this.todoList.push(new Todo(title, description, dueDate, priority))
  }

  removeTodo (id) {
    let todoIndex = this.todoList.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      this.todoList.splice(todoIndex, 1);
    }
  }

  filterTodosToday() {
    return this.todoList.filter((todo) => {
      const dueDate = format((new Date(todo.dueDate)), 'MM/dd/yyyy');
      return isToday(dueDate);
    })
  }

  filterTodosThisWeek() {
    return this.todoList.filter((todo) => {
      const dueDate = format((new Date(todo.dueDate)), 'MM/dd/yyyy');
      return isThisWeek(dueDate);
    })
  }
}

