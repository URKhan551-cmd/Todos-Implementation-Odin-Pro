export default function saveNLoadData(){
const TODO_STORAGE_KEY = "todos";
  const PROJECT_STORAGE_KEY = "projects";
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
  };

  function loadProjects(){
    const storedProjects = localStorage.getItem(PROJECT_STORAGE_KEY);
    if(!storedProjects){
      return [];
    };
    return JSON.parse(storedProjects);
  }
  function saveProjects(projects){
    localstorage.setItem(
      PROJECT_STORAGE_KEY, JSON.strinify(projects)
    );
    return true;
  };

  function removeProjects(){
    return localStorage.removeItem(PROJECT_STORAGE_KEY);
  }

  
  return {loadData, saveData, clearTodos, loadProjects, saveProjects, removeProjects}
}
