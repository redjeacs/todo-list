import Storage from './storage';
import ProjectList from './projectList';

export default class Website {
  static loadPage() {
    Storage.saveProjectList(new ProjectList());
    Website.initAddProjectBtn();
  }

  static initAddProjectBtn() {
    const addProjectBtn = document.querySelector('.add-project-btn');
    const projectFormDiv = document.getElementById('project-form');
    const projectDetailsForm = document.getElementById('project-details-form');
    const cancelProjectBtn = document.getElementById('cancel-project-btn');
    const projectNameInput = document.getElementById('project-name');

    addProjectBtn.addEventListener('click', () => {
      console.log('test');
      projectFormDiv.style.display = 'block';
      addProjectBtn.style.display = 'none';
    })

    projectDetailsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const projectName = projectNameInput.value;
      if (projectName) {
        Website.createProject(projectName);
        Storage.addProject(projectName);
        projectFormDiv.style.display = 'none';
        addProjectBtn.style.display = 'block';
        projectNameInput.value = '';
      }
      else {
        alert('Please enter a project name');
      }
    })

    cancelProjectBtn.addEventListener('click', () => {
      projectNameInput.value = '';
      projectFormDiv.style.display = 'none';
      addProjectBtn.style.display = 'block';
    })
  }

  static createProject(name) {
    const projectsContainer = document.querySelector('.projects-container');
    const newProject = document.createElement('div');
    newProject.classList.add('project', `${name}`);
    const newProjectBtn = document.createElement('button');
    newProjectBtn.classList.add('project-btn', `${name}`);
    newProjectBtn.textContent = name;
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.textContent = 'X';
    deleteProjectBtn.classList.add('delete-project-btn');
    newProject.appendChild(newProjectBtn);
    newProject.appendChild(deleteProjectBtn);
    projectsContainer.appendChild(newProject);
  }

  // loadProject(title) {
  //   const todosContainer = document.querySelector('.todos-container');
  //   todosContainer.innerHTML = '';
  //   const newTodo = document.createElement('div');
  // }

  // initiateProjectBtns() {
  //   const projectBtns = document.querySelectorAll('.project-btn');
  //   const deleteProjectBtns = document.querySelectorAll('.delete-project-btn');

  //   projectBtns.forEach(btn => {
  //     btn.addEventListener('click', Website.loadProject(btn.textContent))
  //   })
  // }
}