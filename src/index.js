import './styles.css';
import ProjectList from './modules/projectList';
import ToDo from './modules/todo';
import Project from './modules/project';


console.log('hello');

const test = new ProjectList();
console.log(test.getProject('Today'));
console.log(test);
const toDo = new ToDo('day 3', 'day 3 test', 'this week', 'high');
console.log(toDo);
const project = new Project('toDo Project');
project.addToDo('day 3', 'day 3 test', 'this week', 'high');
project.addToDo('day 2', 'day 2 test', 'this week', 'low');
console.log(project);
