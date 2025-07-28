import Project from "./project";

export default class ProjectList {
  constructor () {
    this.projects = [];
    this.projects.push(new Project('Inbox'));
    this.projects.push(new Project('Today'));
    this.projects.push(new Project('This week'));
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
}