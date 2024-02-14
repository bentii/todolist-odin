import '../scss/index.scss';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './taskManager.js';

import {getTask} from './taskManager.js';
import {createTask} from './taskManager.js';

const add = document.getElementById('addTaskBtn');
add.addEventListener('click', function(){
    createTask();
});