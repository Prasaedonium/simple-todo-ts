"use strict";
// Get DOM elements
const btn = document.getElementById("btn");
const input = document.getElementById("todoInput");
const form = document.querySelector("#todoform");
const list = document.getElementById("todolist");
// Initialize the todos array and populate it from local storage
const todos = readTodos();
todos.forEach(createTodo);
// Function to read todos from local storage
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
// Function to save todos to local storage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Event handler for form submission
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: " " + input.value + " ",
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    console.log("submitted");
    input.value = "";
}
// Function to create a new todo item
function createTodo(todo) {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "✖";
    deleteButton.classList.add("btn", "btn-danger");
    const newLI = document.createElement("LI");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input");
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        saveTodos();
    });
    deleteButton.addEventListener("click", function () {
        const index = todos.indexOf(todo);
        if (index > -1) {
            todos.splice(index, 1);
            saveTodos();
            list.removeChild(newLI);
        }
    });
    newLI.append(checkbox);
    newLI.append(todo.text);
    newLI.append(deleteButton);
    list.append(newLI);
}
// Add space element
// Event listener for form submission
form.addEventListener("submit", handleSubmit);
