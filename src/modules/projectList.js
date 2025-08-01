import Project from "./project";

export default class ProjectList {
  constructor () {
    this.projects = [];
    this.projects.push(new Project('Inbox'));
    this.projects.push(new Project('Today'));
    this.projects.push(new Project('This week'));
  }

  set projects(newProjects) {
    this._projects = newProjects;
  }
  
  get projects() {
    return this._projects;
  }


  getProject(title) {
    const project = this.projects.find(project => project.title == title);
    return project;
  }

  addProject(title) {
    if (this.projects.includes(title)) {
      console.log('project already exists');
      return
    }
    this.projects.push(new Project(title));
  }

  removeProject(projectId) {
    const projectIndex = this.projects.findIndex(project => project.projectId === projectId);
    if (projectIndex !== -1) {
      this.projects.splice(projectIndex, 1);
    }
  }

  updateTodayProject() {
    this.getProject('Today').todoList = [];
    this.projects.forEach(project => {
      if (project.title !== 'Today' && project.title !== 'This week') {
        const todosToday = project.filterTodosToday();
        this.getProject('Today').todoList.push(...todosToday);
      }
    });
  }

  updateThisWeekProject() {
    this.getProject('This week').todoList = [];
    this.projects.forEach(project => {
      if (project.title !== 'Today' && project.title !== 'This week') {
        const todosThisWeek = project.filterTodosThisWeek();
        this.getProject('This week').todoList.push(...todosThisWeek);
      }
    });
  }
}