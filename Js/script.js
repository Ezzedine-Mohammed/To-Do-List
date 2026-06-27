// variables
let tasks = [];
let update = false;

loadTasks();

// document elements
// form elements
const taskTitle = document.getElementById("task-title");
const titleLabel = document.getElementById("task-title-label");
const bodyLabel = document.getElementById("task-body-label");
const taskBody = document.getElementById("task-body");
const taskPriority = document.getElementById("priority");
const newTaskBtn = document.getElementById("add-task-btn");
const newTask = document.getElementById("new-task");
const cancelNewTaskBtn = document.getElementById("cancel");
const saveBtn = document.getElementById("submit");
const taskForm = document.getElementById("task-form");
// table elements
const taskList = document.getElementById("task-list");


// label postion to top of the input field if it has a value
taskTitle.addEventListener("input", function() {
    if (taskTitle.value !== '') {
        titleLabel.classList.add('label-top');
    } else {
        titleLabel.classList.remove('label-top');
    }
});
taskBody.addEventListener("input", function() {
    if (taskBody.value.trim() !== '') {
        bodyLabel.classList.add('label-top'); 
    } else {
        bodyLabel.classList.remove('label-top');
    }
});


// save new task
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    saveTask()
})

// functions

function openForm() {
    newTask.classList.remove('hide');
}

function cancelTask() {
    if (update === true) {
        saveTask();
    }else {
        taskForm.reset();   
        titleLabel.classList.remove('label-top');
        bodyLabel.classList.remove('label-top');
        newTask.classList.add('hide');
    }
}

function saveTask() {
    // create new task object
    const formData = new FormData(taskForm);
    const taskItem = {
        title: formData.get("title"),       
        body: formData.get("body"),       
        priority: formData.get("priority"), 
        date: new Date().toISOString(),
        progress: ""
    };
    // save task to local storage
    tasks.push(taskItem);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // reset form and hide it
    taskForm.reset();
    titleLabel.classList.remove('label-top');
    bodyLabel.classList.remove('label-top');
    newTask.classList.add('hide');
    // load tasks
    loadTasks();
}

function loadTasks() {
    taskList.innerHTML = '';
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (let i = 0; i < tasks.length; i++) {
        const rowElement = document.createElement('tr');
        if (tasks[i].progress === "completed") {
            rowElement.classList.add('completed');
        } else {
            rowElement.classList.remove('completed');
        }
        const title = document.createElement('td');
        title.textContent = tasks[i].title;
        title.className = 'title';
        
        const body = document.createElement('td');
        body.textContent = tasks[i].body;
        body.className = 'description'; 
        
        const priority = document.createElement('td');
        priority.textContent = tasks[i].priority || "low";
        priority.className = 'priority';
        
        const date = document.createElement('td');
        
        const taskDate = new Date(tasks[i].date);
        date.textContent = `${taskDate.getFullYear()}-${taskDate.getMonth() + 1}-${taskDate.getDate()}`;
        date.className = 'date';

        const options = document.createElement('td');
        options.className = 'options';

        const btnCompleteded = document.createElement('button');
        btnCompleteded.className = 'completed';
        btnCompleteded.setAttribute("onclick", `completedTask(${i})`);

        const btnUpdate = document.createElement('button');
        btnUpdate.className = 'update';
        btnUpdate.setAttribute("onclick", `updateTask(${i})`);

        const btnDelete = document.createElement('button');
        btnDelete.className = 'delete';
        btnDelete.setAttribute("onclick", `deleteTask(${i})`);

        options.appendChild(btnCompleteded);
        options.appendChild(btnUpdate);
        options.appendChild(btnDelete);
        
        rowElement.appendChild(title);
        rowElement.appendChild(body);
        rowElement.appendChild(priority);
        rowElement.appendChild(date);
        rowElement.appendChild(options);
        
        taskList.appendChild(rowElement);
    }
}

function completedTask(index) {
    if (tasks[index].progress !== "completed") {
        tasks[index].progress = "completed";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
    } else {
        tasks[index].progress = "";
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    loadTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function updateTask(index) {
    update = true;
    const task = tasks[index];

    taskTitle.value = task.title;
    taskBody.value = task.body;
    taskPriority.value = task.priority || "low";
    titleLabel.classList.add('label-top');
    if (task.body.trim() !== '') {
        bodyLabel.classList.add('label-top');
    }
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    openForm();
}