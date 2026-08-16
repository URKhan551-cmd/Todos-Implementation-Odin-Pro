// Todo responsibilities
export function todoCreateManager(){
let todos = [];

function createTodo(FormData){
    if(!FormData) return;


   const todo = {
    id: crypto.randomUUID(),
    title: FormData.title,
    description: FormData.description,
    purpose: FormData.purpose,
    completed: false,
    dueDate: FormData.dueDate,
    priority: FormData.priority,
    checkList: FormData.checkList,
    createdAt: Date.now()
   }
todos.push(todo);
    return todo;
};

function updateTodo(id, updateData){
    let todo = todos.find(todo => todo.id === id);
    if(!todo){
        console.log("todo is not here to update..");
        return;
    };

    // old implementation improved a bit
// const newTodo  = {   
//     ...todo,
//     ...updateData
// }

    Object.assign(todo, updateData);
    
    return todo;// here i will get this modified todo to localStorage by help of function import from storage. 
};


function toggleTodo(id){

    const todo = todos.find(todo => todo.id === id);
    if(!todo)return;
    todo.completed = !todo.completed;
    return todo;
};


 function deleteTodo(id){
    const todoFind= todos.some(todo => todo.id === id);
     if(!todoFind){
         console.log("Todo not Found...");
         return null;
     };

     const todo = todos.filter(todo => todo.id !== id);
     
     return [...todos];
 };

    
function getTodos(){
    return [...todos];
};

function getTodo(id){
    const todo = todos.map(todo => todo.id === id);
    return todo;
}
       

    return {updateTodo, toggleTodo, createTodo, deleteTodo, getTodos, getTodo};
};
// usage 
// const exampleTodo = todoCreateManager();
// now exampleTodo.craeteTodo(formData);
// now exampleTodo.updateTodo(id, updateData);
