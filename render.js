

renderProjects()
renderTodos()
renderTodoDetails()

clearTodoForm() 
export function openTodoDialog(){  // take this func to index.js where button lies
  clearTodoForm(formData);
  todoDialog.showModal();   
}
export function closeTodoDialog(){
  clearTodoForm(formData);
  todoDialog.close();
}
openProjectDialog()
closeProjectDialog()
