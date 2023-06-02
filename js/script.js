const todosContainer = document.querySelector(".todos-container");
const formAddTodoList = document.querySelector(".form-add-todo");
const formSearchInput = document.querySelector(".form-search input");
const formSearch = document.querySelector(".form-search input");

const addTodoList = (inputValue) => {
  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo=${inputValue}>
      <span>${inputValue}</span>
      <i class="far fa-trash-alt" data-trash=${inputValue}></i>
    </li>`;
  }

  event.target.reset();
}

const removeTodo = (itemClickedElement) => {
  const trashDataValue = itemClickedElement.dataset.trash;
  const todo = document.querySelector(`[data-todo="${itemClickedElement.dataset.trash}"]`);

  if (trashDataValue) {
    todo.remove();
  }
}

todosContainer.addEventListener("click", (event) => {
  const itemClick = event.target;

  removeTodo(itemClick);
});

const manipulateClasses = (todos, classToAdd, classToRemove) => todos
  .forEach((item) => {
    item.classList.add(classToAdd);
    item.classList.remove(classToRemove);
});

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
  .filter((todo) => {
    const matchedTodos = todo.textContent.toLowerCase().includes(inputValue);
    return returnMatchedTodos ? matchedTodos : !matchedTodos;
  });

const hideTodos = (todos, inputValue) => {
  const todosHide = filterTodos(todos, inputValue, false);
  manipulateClasses(todosHide, 'hidden', 'd-flex');
}

const showTodos = (todos, inputValue) => {
  const todosShow =   filterTodos(todos, inputValue, true)
  manipulateClasses(todosShow, 'd-flex', 'hidden');
}

const addEventForm = (event) => {
  event.preventDefault();

  const inputValue = event.target.add.value.trim();
  addTodoList(inputValue);
}

const searchInputForm = (event) => {
  const inputValue = event.target.value.toLowerCase().trim();
  
  const todos = Array.from(todosContainer.children);
  hideTodos(todos, inputValue);

  showTodos(todos, inputValue);
}

formAddTodoList.addEventListener("submit", addEventForm);
formSearch.addEventListener("input", searchInputForm);

