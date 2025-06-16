let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button" data-index="${index}">
        Delete
      </button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  // Add event listeners to all delete buttons
  document.querySelectorAll('.js-delete-todo-button').forEach((button) => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      todoList.splice(index, 1);
      saveToStorage();
      renderTodoList();
    });
  });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value.trim();

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (name === '' || dueDate === '') {
    alert("Please enter both name and due date.");
    return;
  }

  todoList.push({ name, dueDate });

  inputElement.value = '';
  dateInputElement.value = '';
  saveToStorage();
  renderTodoList();
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Initial render
renderTodoList();


// Add event listener for Enter key in the name input field
document.querySelector('.js-name-input')
  .addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });