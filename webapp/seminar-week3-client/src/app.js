import _ from 'lodash';
import './styles/appStyle.scss';
import {ToDoList} from './js/todo';

// Create the todolist
let todoList = new ToDoList('todo-list');

window.addEventListener('load', function() {
  // When the DOM is loaded, attach submit eventlistener to the form
  document.getElementsByTagName('form')[0].addEventListener('submit', onSubmitForm);
});

/**
 * Callback for the submit action of the form (when the user presses the button)
 */
function onSubmitForm(e) {
  e.preventDefault();
  let todoInput = document.getElementsByName('todo')[0];
  if (todoInput.value.length > 0 && !todoList.contains(todoInput.value)) {
    todoList.addItem(todoInput.value);
    todoInput.value = '';
  } else {
    alert('Can not add to ToDo list (duplicate item or empty input)');
  }
}

function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());
