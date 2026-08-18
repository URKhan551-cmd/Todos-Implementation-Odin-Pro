import {getFormData, validateFormData, clearTodoForm} from "./todoForm.js";

import {todoCreateManager} from "./todoManager.js"
import {saveNLoadData} from "./storage.js"
import {openTodoDialog, closeTodoDialog, renderTodos, renderProjects, checkBox} from "./render.js"

import {createProjectManager} from "./project.js"
let projectsData = projectManager();


const storage = saveNLoadData();
const storedTodos = storage.loadData();// todos already present will show up here.
const storedPeojects = storage.loadProjects();
const todoManager = todoCreateManager(storedTodos);
const projectManager = createProjectManager(storedProjects.length ? storedProjects : [{
    id: "default",
    name: "default",
    createdAt: Date.now()
}]);



const todoFormHtml = document.querySelector("#dialog-form");
const todoDialog = document.querySelector("#todo-dialog");
// here will be AN EDIT BUTTON For TODO EDITING





const todoList = document.querySelector("#todo-list");
todoList.addEventListener("click", (e) => {
     const detailsButton =
        e.target.closest(".todo-details");

    if (detailsButton) {

        const todoId =
            detailsButton.dataset.todoId;

        const todo =
            todoManager.getTodo(todoId);

        if (!todo) return;

        renderTodoDetails(
            todo,
            todoDetails
        );

        todoDetailsDialog.showModal();

        return;
    }

    // EDIT
    const editButton = e.target.closest(".edit-todo");

    if (editButton) {
        const todoId = editButton.dataset.todoId;

        const todo = todoManager.getTodo(todoId);

        if (!todo) return;

        document.querySelector("#todo-id").value = todo.id;
        document.querySelector("#todo-title").value = todo.title;
        document.querySelector("#todo-description").value = todo.description;
        document.querySelector("#todo-purpose").value = todo.purpose ?? "";
        document.querySelector("#todo-notes").value = todo.notes ?? "";
        document.querySelector("#todo-due-date").value = todo.dueDate;

        todoDialog.showModal();

        return;
    }


    // DELETE
    const deleteButton = e.target.closest(".delete-todo");

    if (deleteButton) {
        const todoId = deleteButton.dataset.todoId;

        todoManager.deleteTodo(todoId);

        storage.saveData(
            todoManager.getTodos()
        );

        const projectTodos =
            todoManager.getTodosByProject(currentProjectId);

        renderTodos(
            projectTodos,
            emptyState,
            todoList
        );

        return;
    }
});

todoList.addEventListener("change", (e) => {

    if (!e.target.matches(".todo-complete")) {
        return;
    }

    const todoId = e.target.dataset.todoId;

    todoManager.toggleTodo(todoId);

    storage.saveData(
        todoManager.getTodos()
    );

    const projectTodos =
        todoManager.getTodosByProject(currentProjectId);
renderTodos(
        projectTodos,
        emptyState,
        todoList
    );
});

todoCard.append(
    checkbox,
    title,
    description,
    editButton
);

const emptyState = document.querySelector("#empty-state");

// both add btn do the same this open a dialog for filling
const addTodoBtn = document.querySelector("#add-todo-btn");    // function comes form    ./render.js
addTodoBtn.addEventListener("click", () => {
  openTodoDialog(todoDialog, todoForm)
})
const emptyAddTodoBtn = document.querySelector("#empty-add-todo-btn");  
emptyAddTodoBtn.addEventListener("click", () => {
  openTodoDialog(todoDialog, todoForm);
})    // function comes from  ./render.js


// bith func come from the render to close the form.
const cancelTodoBtn = document.querySelector("#cancel-todo");
cancelTodoBtn.addEventListener("click", closeTodoDialog);  // this func comes from   ./render.js
const closeDialogBtn = document.querySelector("#close-dialog-btn");
closeDialogBtn.addEventListener("click", closeTodoDialog);  // this also comes from ./render.js


const projectDialog = document.querySelector("#project-dialog");
const projectForm = document.querySelector("#project-form");
projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectData = Object.fromEntries(formData);
    const project = projectManager.createProject(projectData.projectName);  // this will create a individual project by projectName.
    console.log(projectData) // { projectName: "work"};
    const projects = projectManager.getProjects(); // this will give us the stored projects in arr of project.js
    storage.saveProjects(projects);
    renderProjects(projects, projectList);
    projectForm.reset();
    projectDialog.close();
});


let currentProjectId = "default";
const projectList = document.querySelector("#project-list");
projectList.addEventListener("click", (e) => {
    const projectButton = e.target.closest(".project-item");
    if(!projectButton) return;
  currentProjectId =  projectButton.dataset.projectId;
    const  todos = todoManager.getTodosByProject(currentProjectId);
    renderTodos(todos, emptyState, todoList);
});


const closeProjectBtn = document.querySelector("#close-project-dialog");
closeProjectBtn.addEventListener("click", () => {
    projectDialog.close();
})


const addProjectBtn = document.querySelector("#add-project-btn");
addProjectBtn.addEventListener("click", () => {
    projectDialog.showModal();
});



const mobileMenuBtn = document.querySelector("#mobile-manu-btn");
const sidebar = document.querySelector("#sidebar");

// for individual todo details page  appears.
const todoDetailsDialog =
    document.querySelector("#todo-details-dialog");
const todoDetails =
    document.querySelector("#todo-details");
todoDetails.addEventListener("click", (e) => {
  if (!e.target.matches(".delete-todo")) {
        return;
    };
  
  const todoId = e.target.dataset.todoId;
  const todos = todoManager.deleteTodo(todoId);
  storage.saveData(todos);
  todoDetailsDialog.close();
  renderTodos(todos, emptyState, todoList);
})

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
    console.log(result.error.flatten().fieldErrors);
    return;
  };

    const todoId =
        document.querySelector("#todo-id").value;

    if (todoId) {
        todoManager.updateTodo(
            todoId,
            result.data
        );
    } else {
        todoManager.createTodo(
            result.data,
            currentProjectId
        );
    }
  
  storage.saveData(todoManager.getTodos());  // getTodods will retrieve the arr and storage.savedata take this Arr to localStorage.

 const projectTodos = todoManager.getTodosByProject(currentProjectId);
    
  renderTodos(projectTodos, emptyState, todoList);
  clearTodoForm(todoForm);
  todoDialog.close();
});


// if i delete the project the todos must be go to the default project
// no to delete todos when i click on project delete.
// todos persist.
function deleteProjectAndHandleTodos(projectId){
    if(projectId === "default"){
        return;
    };
    
const todos = todoManager.getTodos(); // this will giveus an arr of [...todos]
    todos.forEach(todo => {
        if(todo.projectId === projectId){
            todoManager.updateTodo(todo.id, {
                projectId: "default"
            })
        }
    });

projectManager.deleteProject(projectId);    // this will delete just project

storage.saveData(todoManager.getTodos());   // this will get todos from the array and put inside of local storage

storage.saveProjects(projectManager.getProjects());   // this will get projects from the arr and put it into localStorage.

currentProjectId = "default";     

renderProjects(projectManager.getProjects, projectList);       
renderTodos(todosManager.getTodosByProject("default"), emptyState, todoList);
    
    
}


