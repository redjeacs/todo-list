import './styles.css';
import ProjectList from './modules/projectList';
import Storage from './modules/storage';
import Website from './modules/website';
import Project from './modules/project';

const test = new ProjectList();
test.addProject('Todo Project');
test.getProject('Todo Project').addTodo('day 3', 'day 3 test', '2025-07-28', 'high');
test.getProject('Todo Project').addTodo('day 2', 'day 2 test', '2025-07-31', 'low');
test.getProject('Todo Project').addTodo('day 4', 'day 5 test', '2025-07-30', 'medium');
test.updateTodayProject();
console.log(test);
document.addEventListener('DOMContentLoaded', Website.loadPage);