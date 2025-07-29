import './styles.css';
import ProjectList from './modules/projectList';
import Todo from './modules/todo';
import Project from './modules/project';



console.log('hello');

const test = new ProjectList();
console.log(test.getProject('Today'));
console.log(test);
const todo = new Todo('day 3', 'day 3 test', 'this week', 'high');
console.log(todo);
const project = new Project('Todo Project');
project.addTodo('day 3', 'day 3 test', '2025-07-28', 'high');
project.addTodo('day 2', 'day 2 test', '2025-07-31', 'low');
project.addTodo('day 4', 'day 5 test', '2025-07-31', 'low');
project.addTodo('day 5', 'day 4 test', '2025-07-29', 'low');
project.addTodo('day 6', 'day 6 test', '2025-07-30', 'low');
console.log(project);
console.log(project.filterTodosThisWeek());
