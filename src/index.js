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
project.addTodo('day 3', 'day 3 test', 'this week', 'high');
project.addTodo('day 2', 'day 2 test', 'this week', 'low');
console.log(project);
