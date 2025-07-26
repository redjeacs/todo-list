import CreateToDo from "./todo";

class CreateProject {
  constructor (title) {
    this.title = title;
    this.projectId = crypto.randomUUID();
    this.toDoList = [];
  }

  addToDo (title, description, dueDate, priority) {
    this.toDoList.push(new CreateToDo(title, description, dueDate, priority))
  }

  removeToDo (id) {
    let toDoIndex = this.toDoList.findIndex(toDo => toDo.id === id);
    this.toDoList.splice(toDoIndex, 1);
  }
}