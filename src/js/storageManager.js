import { tasks } from "./taskManager.js";

function fetchStorage(){
    return JSON.parse(localStorage.getItem('tasks') || "[]");
}


function addStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export {fetchStorage, addStorage};