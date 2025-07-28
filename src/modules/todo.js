export default class Todo {
  constructor(title, description, dueDate, priority) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this.id = crypto.randomUUID();
    this.completed = false;
  }

  get title() {
    return this._title;
  }
  set title(newTitle) {
    this._title = newTitle;
  }

  get description() {
    return this._description;
  }
  set description(newDescription) {
    this._description = newDescription;
  }

  get dueDate() {
    return this._dueDate;
  }
  set dueDate(newDueDate) {
    this._dueDate = newDueDate;
  }

  get priority() {
    return this._priority;
  }
  set priority(newPriority) {
    this._priority = newPriority;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}