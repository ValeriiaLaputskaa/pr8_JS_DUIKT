const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false }
];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
  const text = prompt('Enter a new TODO:');
  if (text) {
    const newTodo = {
      id: Date.now(),
      text,
      checked: false
    };
    todos.push(newTodo);
    saveTodos();
    render();
    updateCounter();
  }
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onchange="checkTodoById(${todo.id})"/>
      <label for="${todo.id}"><span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodoById(${todo.id})">delete</button>
    </li>
  `;
}

function render() {
  list.innerHTML = todos.map(renderTodo).join('');
}

function updateCounter() {
  const totalCount = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.checked).length;
  itemCountSpan.textContent = totalCount;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function deleteTodoById(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
  updateCounter();
}

function checkTodoById(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    saveTodos();
    render();
    updateCounter();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  updateCounter();
});
