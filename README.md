# Todos-Implementation-Odin-Pro
This is all about todos but in Factory FunctionApproach and many best ideas of writing code in it.

Features
Todo Features
Create a Todo
Edit a Todo
Delete a Todo
Mark a Todo as completed
View Todo details
Set a due date
Set priority
Add a purpose
Add notes
Add checklist items
Associate a Todo with a Project

Project Features
Create Projects
Select Projects
Display only Todos belonging to the selected Project
Delete Projects
Move Todos from a deleted Project to the Default Project
Technical Features
JavaScript ES Modules
Factory functions
Closures for private application state
Zod validation
FormData API
Event delegation
DOM manipulation
localStorage persistence
Separation of concerns


The main responsibility of each part is:

Module	Responsibility
todoManager.js	Todo state and Todo operations
project.js    	Project state and Project operations
todoForm.js	    Form extraction, validation, and reset
storage.js	    Saving/loading application data
render.js	      Creating and updating DOM elements
index.js	      Connects everything and handles application events

The important principle is:

State-changing logic should not be mixed with DOM-rendering logic.


Todo Data Model

A Todo has the following structure:

{
    id: "unique-id",
    projectId: "project-id",
    title: "Learn JavaScript",
    description: "Study JavaScript modules",
    purpose: "Improve programming skills",
    completed: false,
    dueDate: "2026-08-20",
    priority: "high",
    checkList: [
        "Learn arrays",
        "Learn promises",
        "Practice modules"
        ],
    createdAt: 1750000000000
};


const project = {
    id: "abc123",
    name: "Work"
};

const todo = {
    id: "todo456",
    projectId: "abc123",
    title: "Finish report"
};

The Todo belongs to Work because:

todo.projectId === project.id


This Todo application is more than a simple list of tasks.

It demonstrates how a small JavaScript application can be organized around clear responsibilities:

