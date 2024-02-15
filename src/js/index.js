import "../scss/index.scss";
import $ from "jquery";
import "bootstrap";
import "./taskManager.js";
import "./sidebarManager.js";
import { tasks } from "./taskManager.js";
import {tag} from "./sidebarManager.js";

import { editTask, createTask, deleteTask } from "./taskManager.js";


$(document).on("click", ".btnAdd", function () {
  if (this.id == "addTaskBtn") {
    createTask(tag);
  } else {
    editTask();
  }
  $("#addModal").modal("hide").trigger("hidden.bs.modal");
  $("#addModal").find("form")[0].reset();
  $('.descriptionDiv').remove();
});

$(document).on("click", "#cancelTaskBtn", function () {
  $("#addModal").find("form")[0].reset();
});

$(document).on("click", ".editBtn", function () {
  // Recupere o ID da tarefa associada ao botão
  const taskId = $(this).closest(".task").attr("id");
  // Recupere os dados da tarefa usando o ID
  const taskData = tasks[taskId];
  // Preencha o modal com os dados da tarefa
  $("#titleTask").val(taskData.title);
  $("#descriptionTask").val(taskData.description);
  $("#dateTask").val(taskData.dueDate);
  $('input[name="radio"][value="' + taskData.priority + '"]').prop(
    "checked",
    true
  );

  $("#modalLabel").text("Edit Task");

  $("#addModal").modal("show");
  const id = document.querySelector(".btnAdd").id;
  if (id != "editTaskBtn") {
    document.getElementById("addTaskBtn").id = "editTaskBtn";
  }
  $("#editTaskBtn").data("taskId", taskId);
  document.getElementById("modalLabel").textContent = "Edit Task";
});

$(document).on("click", "#addTask", function () {
  document.getElementById("modalLabel").textContent = "Add Task";
  const id = document.querySelector(".btnAdd").id;
  if (id !== "addTaskBtn") {
    document.querySelector(".btnAdd").id = "addTaskBtn";
  }
});

$(document).on('click', '.description', function(){
    const parentDiv = $(this).closest('.task');
    descriptionToggle(parentDiv);
})

function descriptionToggle(div) {
    const description = div.next('.descriptionDiv');
    
    if (description.length) {
        description.remove();
    } else {
        const descriptionDiv = $('<div>').addClass('descriptionDiv rounded');
        const title = $('<p>').addClass('descriptionTitle').text('Description');
        const descriptionText = $('<p>').text(tasks[div.attr('id')].description);

        // Adiciona o título e o texto da descrição à nova div
        descriptionDiv.append(title, descriptionText);
        descriptionDiv.insertAfter(div);
    }
}

$(document).on('click', '.delete', function() {
    var parentId = $(this).parent().attr('id');
    deleteTask(parentId); // Aqui você tem o ID do elemento pai do botão clicado
});