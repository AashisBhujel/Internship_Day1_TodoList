document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  const todoInput = document.getElementById('todo-input');
  const addTodoBtn = document.getElementById('addTodoBtn');

  addTodoBtn.addEventListener('click', addTodo);
  todoList.addEventListener('click', handleTodoClick);

  let todos = [];

  function renderTodos() {
    todoList.innerHTML = todos
      .map((todo, index) => createTodoItemHTML(todo, index))
      .join('');
  }

  function createTodoItemHTML(todo, index) {
    return `
        <div class="todo-item ${todo.status === 'done' ? 'completed' : ''}">
          <input type="checkbox" ${todo.status === 'done' ? 'checked' : ''}>
          <span>${todo.text}</span>
          <select class="status-select" data-index="${index}">
            <option value="in progress" ${
              todo.status === 'in progress' ? 'selected' : ''
            }>In Progress</option>
            <option value="completed" ${
              todo.status === 'completed' ? 'selected' : ''
            }>Completed</option>
            <option value="done" ${
              todo.status === 'done' ? 'selected' : ''
            }>Done</option>
          </select>
          <button data-action="edit" data-index="${index}">Edit</button>
          <button data-action="delete" data-index="${index}">Delete</button>
        </div>
      `;
  }

  function addTodo() {
    const text = todoInput.value.trim();
    if (text !== '') {
      todos.push({ text, status: 'in progress' });
      todoInput.value = '';
      renderTodos();
    }
  }

  function handleTodoClick(event) {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      const action = target.dataset.action;
      const index = parseInt(target.dataset.index, 10);

      if (action === 'edit') {
        editTodo(index);
      } else if (action === 'delete') {
        deleteTodo(index);
      }
    } else if (target.tagName === 'INPUT' && target.type === 'checkbox') {
      const index = parseInt(
        target.nextElementSibling.nextElementSibling.dataset.index,
        10
      );
      toggleStatus(index);
    } else if (target.tagName === 'SELECT') {
      const index = parseInt(target.dataset.index, 10);
      updateStatus(index, target.value);
    }
  }

  function editTodo(index) {
    const newText = prompt('Edit todo:', todos[index].text);
    if (newText !== null) {
      todos[index].text = newText.trim();
      renderTodos();
    }
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
  }

  function toggleStatus(index) {
    todos[index].status =
      todos[index].status === 'done' ? 'in progress' : 'done';
    renderTodos();
  }

  function updateStatus(index, newStatus) {
    todos[index].status = newStatus;
    renderTodos();
  }

  renderTodos();
});
