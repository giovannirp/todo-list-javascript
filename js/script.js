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

formAddTodoList.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = event.target.add.value.trim();
  addTodoList(inputValue);
});

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

formSearch.addEventListener("input", (event) => {
  const inputValue = event.target.value.toLowerCase().trim();
  
  Array.from(todosContainer.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(inputValue))
    .forEach((item) => {
      item.classList.add('hidden');
      item.classList.remove('d-flex');
  });

  Array.from(todosContainer.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(inputValue))
    .forEach((item) => {
      item.classList.remove('hidden');
      item.classList.add('d-flex');
  });
})

