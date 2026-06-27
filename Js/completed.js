function loadTasks() {
    taskList.innerHTML = '';
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (let i = 0; i < tasks.length; i++) {
        const rowElement = document.createElement('tr');
        if (tasks[i].progress === "completed") {
            rowElement.classList.add('completed');
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

            const btnCompleted = document.createElement('button');
            if (tasks[i].progress === "completed") {
                btnCompleted.className = 'not-finished'; 
                btnCompleted.setAttribute("title", "not finished");
            } else {
                btnCompleted.className = 'completed'; 
                btnCompleted.setAttribute("title", "completed");
            }
            btnCompleted.setAttribute("onclick", `completedTask(${i})`);

            const btnUpdate = document.createElement('button');
            btnUpdate.className = 'update';
            btnUpdate.setAttribute("onclick", `updateTask(${i})`);
            btnUpdate.setAttribute("title", "update");

            const btnDelete = document.createElement('button');
            btnDelete.className = 'delete';
            btnDelete.setAttribute("onclick", `deleteTask(${i})`);
            btnDelete.setAttribute("title", "delete");

            options.appendChild(btnCompleted);
            options.appendChild(btnUpdate);
            options.appendChild(btnDelete);
            
            rowElement.appendChild(title);
            rowElement.appendChild(body);
            rowElement.appendChild(priority);
            rowElement.appendChild(date);
            rowElement.appendChild(options);
            
            taskList.appendChild(rowElement);   
        } else {
            rowElement.classList.remove('completed');
        }
        
    }
}

loadTasks();

function saveTask() {
    // create new task object
    const formData = new FormData(taskForm);
    const taskItem = {
        title: formData.get("title"),       
        body: formData.get("body"),       
        priority: formData.get("priority"), 
        date: new Date().toISOString(),
        progress: "completed"
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