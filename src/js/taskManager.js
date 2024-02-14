import detailsIcon from '../img/details.svg';
import editIcon from '../img/edit.svg';
import deleteIcon from '../img/delete.svg';

class Task {
    constructor(title, description, dueDate, priority, tag){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        // this.tag = tag;
    }

    editTask({ title, description, dueDate, priority, tag }){
        this.title = title !== undefined ? title : this.title;
        this.description = description !== undefined ? description : this.description;
        this.dueDate = dueDate !== undefined ? dueDate : this.dueDate;
        this.priority = priority !== undefined ? priority : this.priority;
        // this.tag = tag !== undefined ? tag : this.tag;
    }

    showTask(){
        console.log(`${this.title}, ${this.description}. Expires in ${this.dueDate}. ${this.priority}.`);
    }
}

function getTask(){
    const title = document.getElementById('titleTask').value;
    const desc = document.getElementById('descriptionTask').value;
    const date = document.getElementById('dateTask').value;
    const prio = document.querySelector('input[name="radio"]:checked').value;

    return{title, desc, date, prio};
}

function createTask(){
    const {title, desc, date, prio} = getTask();
    const task = new Task(title,desc,date,prio);
    return displayTask(task);
}

function displayTask(taskObj){
    const detailsImg = new Image();
    detailsImg.src = detailsIcon;
    const editImg = new Image();
    editImg.src = editIcon;
    const deleteImg = new Image();
    deleteImg.src = deleteIcon;
    const container = document.getElementById('container');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const div5 = document.createElement('div');
    const div6 = document.createElement('div');
    const div7 = document.createElement('div');

    div1.classList.add('d-flex','border');
    div2.classList.add('edit', 'ms-2', 'd-flex');
    div3.classList.add('flex-grow-1', 'col-7');
    div4.classList.add('ms-2');
    div5.classList.add('ms-2', 'col-1');
    div6.classList.add('edit','ms-2','d-flex');
    div7.classList.add('delete','ms-2', 'me-2','d-flex');
    
    container.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(detailsImg);
    div1.appendChild(div3);
    div3.textContent = taskObj.title;
    div1.appendChild(div4);
    div4.textContent = taskObj.dueDate;
    div1.appendChild(div5);
    div5.textContent = taskObj.priority;
    div1.appendChild(div6);
    div6.appendChild(editImg);
    div1.appendChild(div7);
    div7.appendChild(deleteImg);
}


export {createTask, getTask};