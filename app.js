// let todos = [];
filterValue = "all";
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todolist = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  creatTodos(todos);
});
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

function addNewTodo(e) {
  e.preventDefault();
  if (!todoInput.value) return null;
  const newTodo = {
    id: Date.now(),
    createAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };
  saveTodo(newTodo);
  filterTodos();
}

function creatTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `     <li class="todo">
    <p class="todo__title ${todo.isCompleted && "completed"}">${todo.title} </p>
    <span class="todo__createAt">${new Date(todo.createAt).toDateString(
      "fa-IR"
    )}</span>
    <button class="todo__check" data-todo-id=${
      todo.id
    } ><i class="far fa-check-square"></i></button>
    <button class="todo__remove" data-todo-id=${
      todo.id
    }><i class="far fa-trash-alt"></i></button>
    </li>`;
  });
  todolist.innerHTML = result;
  todoInput.value = "";
  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));
  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodo));
}

function filterTodos() {
  // console.log(e.target.value);
  // const filter = e.target.value;
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      creatTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted);
      creatTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted);
      creatTodos(filteredTodos);
      break;
    }
    default:
      creatTodos(todos);
  }
}
function removeTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
}
function checkTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
