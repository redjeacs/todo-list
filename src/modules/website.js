import Storage from './storage';
import ProjectList from './projectList';
import { format } from 'date-fns';
import { de, tr } from 'date-fns/locale';

export default class Website {
  static loadPage() {
    Storage.saveProjectList(new ProjectList());
    Website.initiateAddProjectBtn();
    Website.initiateAddTodoBtn();
  }

  static initiateAddProjectBtn() {
    const addProjectBtn = document.querySelector('.add-project-btn');
    const projectFormDiv = document.getElementById('project-form');
    const projectDetailsForm = document.getElementById('project-details-form');
    const cancelProjectBtn = document.getElementById('cancel-project-btn');
    const projectNameInput = document.getElementById('project-name');

    addProjectBtn.addEventListener('click', () => {
      projectFormDiv.style.display = 'block';
      addProjectBtn.style.display = 'none';
    })

    projectDetailsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const projectName = projectNameInput.value;
      if (projectName) {
        Storage.addProject(projectName);
        Website.createProject(projectName);
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

  static initiateAddTodoBtn() {
    const addTodoBtn = document.querySelector('.add-todo-btn');
    const todoModal = document.querySelector('#todo-modal');

    addTodoBtn.addEventListener('click', () => {
      todoModal.showModal();
    })
  }

  static initiateLoadProjectBtns(name) {
    const projectBtns = document.querySelector(`.project-btn.${name.replace(/\s+/g, '-')}`);
    const deleteProjectBtns = document.querySelector(`.delete-project-btn.${name.replace(/\s+/g, '-')}`);

    projectBtns.addEventListener('click', Website.loadProject);

    function deleteProject(e) {
      console.log('delete project');
      const projectName = e.target.parentElement.querySelector(`.project-btn.${name.replace(/\s+/g, '-')}`).textContent;
      Storage.removeProject(projectName);
      e.target.parentElement.remove();
      if (document.querySelector('.todos-container')) {
        document.querySelector('.todos-container').innerHTML = '';
      }
    }

    deleteProjectBtns.addEventListener('click', deleteProject);
  }

  static createProject(name) {
    const projectsContainer = document.querySelector('.projects-container');
    const newProject = document.createElement('div');
    newProject.classList.add('project', `${name.replace(/\s+/g, '-')}`);
    const newProjectBtn = document.createElement('button');
    newProjectBtn.classList.add('project-btn', `${name.replace(/\s+/g, '-')}`);
    const projectIcon = document.createElement('i');
    projectIcon.classList.add('fa-solid', 'fa-list-check');
    newProjectBtn.textContent = name;
    newProjectBtn.prepend(projectIcon);
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.textContent = 'X';
    deleteProjectBtn.classList.add('delete-project-btn', `${name.replace(/\s+/g, '-')}`);
    newProject.appendChild(newProjectBtn);
    newProject.appendChild(deleteProjectBtn);
    projectsContainer.appendChild(newProject);
    Website.initiateLoadProjectBtns(name);
  }

  static loadProject(title) {
    const todosContainer = document.querySelector('.todos-container');
    todosContainer.innerHTML = '';
    const currentProject = Storage.getProject(title);
    currentProject.todoList.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
      todoItem.classList.add(`${todo.priority}`);
      const todoCompleteBtn = document.createElement('input');
      todoCompleteBtn.type = 'checkbox';
      todoCompleteBtn.classList.add('todo-complete-btn');
      todoCompleteBtn.checked = todo.toggleComplete();
      const todoTitle = document.createElement('span');
      todoTitle.textContent = todo.title;
      const todoDueDate = document.createElement('span');
      todoDueDate.textContent = format(new Date(todo.dueDate), 'MM/dd/yyyy');
      const deleteTodoBtn = document.createElement('button');
      deleteTodoBtn.textContent = 'X';
      deleteTodoBtn.classList.add('delete-todo-btn');
    });
  }

  

}

