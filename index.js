
const form = document.querySelector(".add");
const input = document.querySelector(".text-add")
const submitBtn = document.querySelector(".add-todo");
const todoList = document.querySelector(".todos");
const dayTitle = document.getElementById("dayName");

document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
});

const lang = navigator.language;
const date = new Date();
const dayName = date.toLocaleString(lang, {
  weekday: "long" });
dayTitle.innerHTML = dayName;



form.addEventListener('click', addItem);


function addItem(event) {
    event.preventDefault();
  const value = input.value.trim();
  const createdAt = getCurrentTime()



if(value) {
    createListItem(value, createdAt, todoList.childElementCount);
    input.value = '';
    saveTodos();
} else {
    console.log('please enter value')
}

}
function getCurrentTime() {
    const currenDate = new Date();
    return currenDate.toLocaleTimeString();
}


function createListItem(value, createdAt, index) {
  const taskElement = document.createElement('li');
  taskElement.classList.add('todo-list__item');
  taskElement.innerHTML = `
  <input class="checkbox" type="checkbox" id="todo_${index}">
  <label for="todo_${index}">
    <span class="check"></span>
    ${value} - ${createdAt}
  </label>
  <i class="delete"></i>
  `
  todoList.append(taskElement)



  const deleteBtn = taskElement.querySelector('.delete');
  deleteBtn.addEventListener('click', function() {
    taskElement.remove();
  });
}

function saveTodos() {
  const todos = Array.from(todoList.children).map((item) => {
    const label = item.querySelector("label");
    return {
      value: label.textContent.split(" - ")[0],
      createdAt: label.textContent.split(" - ")[1],
    };
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  const todos = JSON.parse(storedTodos) || [];

  todos.forEach((todo) => createListItem(todo.value, todo.createdAt));
}





  



















  


