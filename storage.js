function saveNLoadData(){
const TODO_STORAGE_KEY = "todos";
  // saveData take todos[]   will get put into localStorage.
function saveData(todos){
   localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  return true;
}
function loadData(){
  const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
  if(!storedTodos){
    return [];
  }
  
  return JSON.parse(storedTodos);
};

  function clearTodos(){
    localStorage.removeItem(TODO_STORAGE_KEY);
  }
  return {loadData, saveData, clearTodos}
}
