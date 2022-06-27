
interface Task {
    id?: number,
    TaskName: string,
    isDone: boolean,
    Priority?: number,
    name?: string
}

function deleteTask(taskId: number) {
    fetch('http://localhost:3000/tasks/delete', 
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskId),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function createTask(task: Task) {

    fetch('http://localhost:3000/tasks/create', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function updateTask(taskId: number) {

    fetch('http://localhost:3000/tasks/updateStatus', 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskId),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function updateTaskPriority(data: {taskId: number, Priority: number}) {

    fetch('http://localhost:3000/tasks/updatePriority', 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function getTaskList() {
    let listArray: [Task];
    const list = document.getElementById('tasksList');
    fetch('http://localhost:3000/tasks/', 
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        listArray = data;
        listArray.forEach((Task) => {
            let li = document.createElement('li');
            li.innerText = `ID: ${Task.id} Task: ${Task.TaskName} - Progress: ${Task.isDone ? 'DONE' : 'In Work'} - Priority: ${Task.Priority}`
            list?.appendChild(li);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function getFilteredTasks() {
    let listArray: [Task];
    const list = document.getElementById('filteredTaskList');
    fetch('http://localhost:3000/tasks/filtered', 
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        listArray = data;
        listArray.forEach((Task) => {
            let li = document.createElement('li');
            li.innerText = `ID: ${Task.id} Task: ${Task.TaskName} - Progress: ${Task.isDone ? 'DONE' : 'In Work'} - Priority: ${Task.Priority}`
            list?.appendChild(li);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function createUser (name: string) {
    fetch('http://localhost:3000/users/add', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(name),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    }); 
}