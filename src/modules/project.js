import Todo from "./todo";

export default class Project {
  constructor (title) {
    this.title = title;
    this.projectId = crypto.randomUUID();
    this.todoList = [];
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
}


