import {getFormData, validateFormData, clearTodoForm} from "./todoForm.js";

import {todoCreateManager} from "./todoManager.js"
import {saveNLoadData} from "./storage.js"
import {openTodoDialog} from "./render.js"



const storage = saveNLoadData();
const storedTodos = storage.loadData();  // todos already present will show up here.
const todoManager = todoCreateManager(storedTodos);

const todoForm = document.querySelector("#dialog-form");
const todoDialog = document.querySelector("#todo-dialog");

const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");

// both add btn do the same this open a dialog for filling
const addTodoBtn = document.querySelector("#add-todo-btn");    // function comes form    ./render.js
addTodoBtn.addEventListener("click", openTodoDialog)
const emptyAddTodoBtn = document.querySelector("#empty-add-todo-btn");  
emptyAddTodoBtn.addEventListener("click", openTodoDialog)    // function comes from  ./render.js


const cancelTodoBtn = document.querySelector("#cancel-todo");
const closeDialogBtn = document.querySelector("#close-dialog-btn");

const projectList = document.querySelector("#project-list");
const addProjectBtn = document.querySelector("#add-project-btn");

const projectDialog = document.querySelector("#project-dialog");
const projectForm = document.querySelector("#project-form");

const mobileMenuBtn = document.querySelector("#mobile-manu-btn");
const sidebar = document.querySelector("#sidebar");

// This becomes the orchestrator.

// It connects everything:

// User clicks
//     ↓
// index.js event handler
//     ↓
// Todo/Project logic
//     ↓
// state changes
//     ↓
// storage.save()
//     ↓
// dom.render()

// events
//    ↓
// application logic
//    ↓
// state
//    ↓
// storage
//    ↓

// i do have <form id="dialog-form" method="dialog"></form>  in html where i can access all the fields at once;
const todoForm = document.querySelector("#dialog-form");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = getFormData(e.currentTarget);
  const result = validateFormData(formData);

  if(!result.success){
    console.log(result.errors.flatten().fieldErrors);
    return;
  };

  const todo = todoManager.createTodo(result.data);

  storage.saveData(todoManager.getTodos());  // getTodods will retrieve the arr and storage.savedata take this Arr to localStorage.
  
  storeFunc.saveData(validTodo);
  clearTodoForm(formData);
});



