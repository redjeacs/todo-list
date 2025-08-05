import Project from "./project";
import ProjectList from "./projectList";
import Todo from "./todo";

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export default class Storage {
  static saveProjectList(projectList) {
    if (storageAvailable('localStorage')) {
      localStorage.setItem('projectList', JSON.stringify(projectList));
    } else {
      console.error('Local storage is not available');
    }
  };

  static getProjectList() {
    if (storageAvailable('localStorage')) {
      const projectList = Object.assign(
        new ProjectList(), 
        JSON.parse(localStorage.getItem('projectList'))
      );

      projectList.projects = projectList.projects.map(project => Object.assign(new Project(), project));

      projectList.projects.forEach(project => {
        project = project.todoList.map(todo => Object.assign(new Todo(), todo));
      });

      return projectList;
    } else {
      console.error('Local storage is not available');
      return null;
    }
  };

  static clearProjectList() {
    if (storageAvailable('localStorage')) {
      localStorage.removeItem('projectList');
    } else {
      console.error('Local storage is not available');
    }
  };

  static getProject(projectName) {
    const projectList = Storage.getProjectList();
    return projectList.getProject(projectName);
  }

  static addProject(project) {
    const projectList = Storage.getProjectList();
    projectList.addProject(project);
    Storage.saveProjectList(projectList);
  }

  static removeProject(projectName) {
    const projectList = Storage.getProjectList();
    projectList.removeProject(projectName);
    Storage.saveProjectList(projectList);
  }

  static addTodo(projectName, title, description, duedate, priority) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).addTodo(title, description, duedate, priority);
    Storage.clearProjectList();
    Storage.saveProjectList(projectList);
  }

  static removeTodo(projectName, title) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).removeTodo(title);
    Storage.saveProjectList(projectList);
  }

  static updateTodayProject() {
    const projectList = Storage.getProjectList();
    projectList.updateTodayProject();
    Storage.saveProjectList(projectList);
  }

  static updateThisWeekProject() {
    const projectList = Storage.getProjectList();
    projectList.updateThisWeekProject();
    Storage.saveProjectList(projectList);
  }

  static updateInbox() {
    const projectList = Storage.getProjectList();
  }
};