import ToDo from "./todo";

export default class Project {
  constructor (title) {
    this.title = title;
    this.projectId = crypto.randomUUID();
    this.toDoList = [];
  }

  getTitle() {
    return this.title;
  }
  
  addToDo (title, description, dueDate, priority) {
    this.toDoList.push(new ToDo(title, description, dueDate, priority))
  }

  removeToDo (id) {
    let toDoIndex = this.toDoList.findIndex(toDo => toDo.id === id);
    if (toDoIndex !== -1) {
      this.toDoList.splice(toDoIndex, 1);
    }
  }
}


