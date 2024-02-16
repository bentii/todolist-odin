import detailsIcon from "../img/details.svg";
import editIcon from "../img/edit.svg";
import deleteIcon from "../img/delete.svg";
import {format} from "date-fns";
import { addStorage, fetchStorage } from "./storageManager.js";

class Task {
  constructor(title, description, dueDate, priority, id, tag) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
    this.tag = tag;
  }

  editTask({ title, description, dueDate, priority}) {
    this.title = title !== undefined ? title : this.title;
    this.description =
      description !== undefined ? description : this.description;
    this.dueDate = dueDate !== undefined ? dueDate : this.dueDate;
    this.priority = priority !== undefined ? priority : this.priority;
  }
}

const tasks = fetchStorage();
if(!localStorage.getItem('tasks')){
  tasks[1] = new Task('Learn React', 'Learn the very basics of react', '2024-06-05', 'High', 1, 'today');
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

(function printTaskOnStatup(){
  tasks.forEach(function(task, index) {
    if (task !== null) {
      tasks[index] = new Task(task.title, task.description, task.dueDate, task.priority, task.id, task.tag);
        displayTask(task, 'create');
    }
});
})();

function getTask() {
  const title = document.getElementById("titleTask").value;
  const desc = document.getElementById("descriptionTask").value;
  const date = document.getElementById("dateTask").value;
  const prio = document.querySelector('input[name="radio"]:checked').value;

  return { title, desc, date, prio };
}

function createTask(tag) {
  const { title, desc, date, prio } = getTask();
  const id = tasks.length; // Gerar o próximo ID
  const task = new Task(title, desc, date, prio, id, tag);
  tasks[id] = task; // Armazenar a instância de Task no objeto tasks
  addStorage();
  return displayTask(task, "create");
}

function editTask() {
  const { title, desc, date, prio } = getTask();
  const taskId = $("#editTaskBtn").data("taskId");
  const task = tasks[taskId]; // Acessar a instância de Task usando o ID
  task.editTask({
    title: title,
    description: desc,
    dueDate: date,
    priority: prio,
  });
  addStorage();
  return displayTask(task, "edit");
}

function displayTask(taskObj, parameter) {
  if (parameter == "create") {
    const detailsImg = new Image();
    detailsImg.src = detailsIcon;
    const editImg = new Image();
    editImg.src = editIcon;
    const deleteImg = new Image();
    deleteImg.src = deleteIcon;
    const container = document.getElementById("container");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const div4 = document.createElement("div");
    const div5 = document.createElement("div");
    const div6 = document.createElement("div");
    const div7 = document.createElement("div");

    div1.classList.add("d-flex", "border", "task", "all" , taskObj.tag);
    div1.id = taskObj.id;
    div2.classList.add("edit", "ms-2", "d-flex", "description");
    div3.classList.add("flex-grow-1", "col-7", "title");
    div4.classList.add("ms-2", "date");
    div5.classList.add("ms-2", "col-1", "priority");
    div6.classList.add("edit", "ms-2", "d-flex", "editBtn");
    div7.classList.add("delete", "ms-2", "me-2", "d-flex", "deleteBtn");

    container.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(detailsImg);
    div1.appendChild(div3);
    div3.textContent = taskObj.title;
    div1.appendChild(div4);
    div4.textContent = format(new Date(taskObj.dueDate), 'do MMM');
    div1.appendChild(div5);
    div5.textContent = taskObj.priority;
    div1.appendChild(div6);
    div6.appendChild(editImg);
    div1.appendChild(div7);
    div7.appendChild(deleteImg);
  } else {
    displayEditedTask(taskObj);
  }
}

function displayEditedTask(task) {
  const div = document.getElementById(task.id);
  div.querySelector(".title").textContent = task.title;
  div.querySelector(".date").textContent = format(new Date(task.dueDate), 'do MMM');
  div.querySelector(".priority").textContent = task.priority;
}

function deleteTask(id) {
    $('#' + id).remove();
    tasks.splice(id,1,null);
    addStorage();
}

export { createTask, editTask, tasks, deleteTask };
