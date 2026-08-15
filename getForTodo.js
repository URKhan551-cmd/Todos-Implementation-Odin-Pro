

// validate through zod library.
// npm init -y 
// npm install zod
// json will be look like {"name": "zod-formdata-demo", "version": "1.0.0", "type": "module", "dependencies": { "zod": "^3.23.0" }}

 import {z} from "zod";

 const todoTaskSchema = z.object({
        title: z.string().min(5, "Title is required"),
        description: z.string().min(10, "Description must be at least 10 char").max(1000, "description cannot exceed thousand char"),
        purpose: z.string().optional(),
        //coerce iso string to valid date.
        dueDate: z.coerce.date({
            invalid_type_error: "Invalid Date Format",
        }),

        priority: z.enum(["low", "medium", "high"], {
            errorMap: () => ({ message: "Priority must be low, medium or high"})
        }),

        notes: z.string().optional(),
        
        // validate an arr having only strings
        checkList: z.array(z.string().min(1, "CheckList item cannot be empty"))
    });

export function getFormData(form){
    
    const formData = new FormData(form);
       

    return {
        ...Object.fromEntries(formData),
        checkList: formData.getAll("checkList")
    };
};

//  console.log(formData) 
//  {
//     title: "Learn JavaScript",
//     description: "Study FormData",
//     purpose: "Improve DOM skills",
//     dueDate: "2026-08-20",
//     priority: "high",
//     notes: "Practice for 1 hour",
//     checkList: [
//          "Learn Arrays",
//          "Learn Javascript",
//          "Learn promises"
//       ]
// }
export function validateFormData(formData){
    

    const validTodo = todoTaskSchema.safeParse(formData);

    if(validTodo.success){
        console.log("Data is Valid", validTodo.data);
    } else {
       console.log("Validation Error", validTodo.error.flatten().fieldErrors
    );
    }

    return validTodo;
};

// this is to clear all the form inputs fields
export function clearTodoForm(form){   
  form.reset();
  const checListContainer = form.querySelector("#checkList-container"); // checkList need forceful emptynss
  if(checkListContainer){
    checkListContainer.replaceChildren();  // replaceChildren() clear nice way to completely empty the container.
  }
}




// import {getFormData, validateFormData, clearTodoForm} from "./todoForm.js";  
// this will be in our index.js 


