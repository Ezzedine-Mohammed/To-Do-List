function loadTasks() {
    taskList.innerHTML = '';
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (let i = 0; i < tasks.length; i++) {
        const rowElement = document.createElement('tr');
        if (tasks[i].progress !== "completed") {
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
            btnCompleteded.setAttribute("title", "complete");

            const btnUpdate = document.createElement('button');
            btnUpdate.className = 'update';
            btnUpdate.setAttribute("onclick", `updateTask(${i})`);
            btnUpdate.setAttribute("title", "update");

            const btnDelete = document.createElement('button');
            btnDelete.className = 'delete';
            btnDelete.setAttribute("onclick", `deleteTask(${i})`);
            btnDelete.setAttribute("title", "delete");

            options.appendChild(btnCompleteded);
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