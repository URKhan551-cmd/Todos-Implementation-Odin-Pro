import {todoCreateManager} from "./todoManager.js";
const todoManager = todoCreateManager();




export function renderTodos(todos, emptyState, todoList){  // todos comes from storage.js and pass through todoManager.getTodos();
   todoList.textContent = "";
   if(todos.length === 0){
      emptyState.hidden = false;  // empty state comes from index.js
      return;
   };
emptyState.hidden = true;
todos.forEach(todo => {
   const todoCard = document.createElement("article");
   todoCard.classList.add("todo-card");
   todoCard.dataset.todoId = todo.id;
   const title = document.createElement("h3");
   title.textContent = todo.title;
   const description = document.createElement("p");
        description.textContent = todo.description;

   todoCard.append(title, description);
   todoList.appendChild(todoCard);
   
})
   
}

export function renderTodoDetails(todos, todoDetails){ // here container is an html element
   
   todoDetails.textContent = "";
   
   const title = document.createElement("h2");
   title.textContent = todo.title;
   
   const description = document.createElement("p");
   description.textContent = todo.description;
   const purpose = document.createElement("p");
   purpose.textContent = todo.purpose;
   const dueDate = document.createElement("p");
   dueDate.textContent = `Due: ${todo.dueDate}`;
   
   const priority = document.createElement("p");
   priority.textContent = `Priority: ${todo.priority}`;
   
   const status = document.createElement("p");
   if (todo.completed) {
    status.textContent = "Completed";
    status.style.color = "green";
} else {
    status.textContent = "Not Completed";
}
   

   const checkList = document.createElement("ul");
   todo.checkList.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      checkList.appendChild(li);
      });

   const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete-todo");
    deleteBtn.dataset.todoId = todo.id;
    deleteBtn.textContent = "Delete";
      

      todoDetails.append(title,
        description,
        purpose,
        dueDate,
        priority,
        status,
        checklist,
        deleteBtn
      )
   })
   
}

clearTodoForm() 
export function openTodoDialog(todoDialog, todoForm){  // take this func to index.js where button lies
  clearTodoForm(todoForm);
  todoDialog.showModal();   
}
export function closeTodoDialog(todoDialog, todoForm){
  clearTodoForm(todoForm);
  todoDialog.close();
};

export function renderProjects(projects, projectList){
   projectList.textContent = "";

   projects.forEach(project => {
      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("project-item");
      button.dataset.projectId = project.id;
      button.textContent = project.name;
      projectList.appendChild(button);
   })
}   
openProjectDialog()
closeProjectDialog()

