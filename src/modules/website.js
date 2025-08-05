import Storage from './storage';
import ProjectList from './projectList';
import { format } from 'date-fns';
import { de, tr } from 'date-fns/locale';

export default class Website {
  static loadPage() {
    Storage.saveProjectList(new ProjectList());
    Website.initiateAddProjectBtn();
    Website.initiateAddTodoBtn();
    Website.initiateDefaultProjectbtns();
    Website.loadProject('Inbox');
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
    const todoForm = document.querySelector('#todo-form')
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const title = document.querySelector('#todo-title-input');
    const description = document.querySelector('#todo-description-input');
    const duedate = document.querySelector('#due-date-input');
    const priority = document.querySelector('#priority-input');

    function clearForm() {
      title.value = '';
      description.value = '';
      duedate.value = '';
      priority.value = 'Medium';
    }

    addTodoBtn.addEventListener('click', () => {
      todoModal.showModal();
    })

    closeModalBtn.addEventListener('click', () => {
      todoModal.close();
      clearForm();
    })

    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!duedate.value) {
        const todayDate = format(new Date(), 'yyyy-MM-dd');
        duedate.value = todayDate
      }
      Storage.addTodo(addTodoBtn.id, title.value, description.value, duedate.value, priority.value);
      if(addTodoBtn.id !== 'Inbox') {
        Storage.addTodo('Inbox', title.value, description.value, duedate.value, priority.value);
      }
      clearForm();
      todoModal.close();
      Website.loadProject(addTodoBtn.id);
    })
  }

  static initiateLoadProjectBtns(name) {
    const projectBtns = document.querySelector(`.project-btn.${name.replace(/\s+/g, '-')}`);
    const deleteProjectBtns = document.querySelector(`.delete-project-btn.${name.replace(/\s+/g, '-')}`);

    function loadProject(e) {
      const projectName = e.target.parentElement.querySelector(`.project-btn.${name.replace(/\s+/g, '-')}`).textContent;
      Website.loadProject(projectName);
    }

    projectBtns.addEventListener('click', loadProject);

    function deleteProject(e) {
      const projectName = e.target.parentElement.querySelector(`.project-btn.${name.replace(/\s+/g, '-')}`).textContent;
      Storage.removeProject(projectName);
      e.target.parentElement.remove();
      if (document.querySelector('.todos-container')) {
        document.querySelector('.todos-container').innerHTML = '';
      }
    }

    deleteProjectBtns.addEventListener('click', deleteProject);
  }

  static initiateDefaultProjectbtns() {
    const inboxProjectBtn = document.querySelector('.inbox');
    const todayProjectBtn = document.querySelector('.today');
    const thisWeekProjectBtn = document.querySelector('.this-week');

    function loadProject(e) {
      const projectName = e.target.textContent;
      Website.loadProject(projectName);
    }


    inboxProjectBtn.addEventListener('click', loadProject);
    todayProjectBtn.addEventListener('click', loadProject);
    thisWeekProjectBtn.addEventListener('click', loadProject);
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
    if(title === 'Today') {
      Storage.updateTodayProject();
    }

    if(title === 'This week') {
      Storage.updateThisWeekProject();
    }

    let todosContainer = document.querySelector('.todos-container');
    todosContainer.innerHTML = '';
    const currentProject = Storage.getProject(title);
    const addTodobtn = document.querySelector('.add-todo-btn');

    addTodobtn.id = title;


    currentProject.todoList.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
      todoItem.classList.add(`${todo._priority}`);
      const todoCompleteBtn = document.createElement('input');
      todoCompleteBtn.type = 'checkbox';
      todoCompleteBtn.classList.add('todo-complete-btn');
      const todoTitle = document.createElement('span');
      todoTitle.classList.add('todo-title');
      todoTitle.textContent = todo._title;
      const todoDueDate = document.createElement('span');
      todoDueDate.classList.add('todo-due-date')
      todoDueDate.textContent = format(new Date(todo._dueDate), 'MM/dd/yyyy');
      const editTodoBtn = document.createElement('button');
      editTodoBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      const deleteTodoBtn = document.createElement('button');
      deleteTodoBtn.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
      deleteTodoBtn.classList.add('delete-todo-btn');

      const todoLeft = document.createElement('div');
      todoLeft.classList.add('todo-left');
      const todoRight = document.createElement('div');
      todoRight.classList.add('todo-right')

      todoLeft.appendChild(todoCompleteBtn);
      todoLeft.appendChild(todoTitle);
      todoRight.appendChild(todoDueDate);
      todoRight.appendChild(editTodoBtn);
      todoRight.appendChild(deleteTodoBtn);
      todoItem.appendChild(todoLeft);
      todoItem.appendChild(todoRight);
      todosContainer.appendChild(todoItem);
    });
  }

  

}

