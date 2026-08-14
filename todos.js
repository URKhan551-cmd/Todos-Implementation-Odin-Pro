// Todo responsibilities

function createTodo(FormData){
    if(!FormData) return;

    let id = crypto.getRandomUUID();

   return {
    id,
    title: FormData.title,
    description: FormData.description,
    purpose: FormData.purpose,
    completed: false,
    dueDate: FormData.dueDate,
    priority: FormData.priority,
    checkList: FormData.checkList,
    createdAt: Date.now()
   }
};

function updateTodo(id, updateData){
    let todo = todos.find(todo => todo.id === id);
    if(!todo){
        console.log("todo is not here to update..");
        return;
    };

const newTodo  = {
    ...todo,
    ...updateData
}
    return  newTodo;// here i will get this modified todo to localStorage by help of function import from storage. 
};


function toggleTodo(id){

    const todo = todos.find(todo => todo.id === id);
    if(!todo)return;
    todo.completed = !todo.completed;
    return todo;
};

export default {toggleTodo, updateTodo, createTodo};