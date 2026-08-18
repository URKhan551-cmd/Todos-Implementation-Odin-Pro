export function createProjectManager(initialProjects = []){
  let projects = [...initialProjects];
  
 function createProject(projectName){
   const project = {
     id: crypto.ramdomUUID(),
     name: projectName,
     createdAt: Date.now()
 }
  projects.push(project);
  return project;
}

function deleteProject(id){
  if(id === "default"){
    return false;
  }
  
   projects = projects.filter(project => project.id !== id);
  return [...projects];
};

function getProject(id){
  return projects.find(project => project.id === id); 
};

function getProjects(){
  return [...projects];
}

return { createProject, deleteProject, getProject, getProjects}
}
