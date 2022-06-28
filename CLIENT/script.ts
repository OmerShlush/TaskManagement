interface Task {
    id?: number,
    TaskName: string,
    isDone: boolean,
    Priority?: number,
    name?: string
}

const BASE_URL = 'http://localhost:3000';

async function deleteTask (taskId: number) {
    const results = await fetch(BASE_URL + '/tasks/delete', 
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskId),
    })
    console.log(results.json());
}

async function createTask(task: Task) {

    const results = await fetch(BASE_URL + '/tasks/create', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    console.log(results.json());
}

async function updateTask(taskId: number) {

    const results = await fetch(BASE_URL + '/tasks/updateStatus', 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskId),
    })
    console.log(results.json())
}

async function updateTaskPriority(data: {taskId: number, Priority: number}) {

    const results = await fetch(BASE_URL + '/tasks/updatePriority', 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    console.log(results.json());
}

function getTaskList() {
    let listArray: [Task];
    const list = document.getElementById('tasksList');
    fetch(BASE_URL + '/tasks/', 
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


async function getFilteredTasks() {
    let listArray: [Task];
    const list = document.getElementById('filteredTaskList');
    const results = await fetch(BASE_URL + '/tasks/filtered', 
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    results.json()
        .then(data => {
            listArray = data;
            listArray.forEach((Task) => {
                let li = document.createElement('li');
                li.innerText = `ID: ${Task.id} Task: ${Task.TaskName} - Progress: ${Task.isDone ? 'DONE' : 'In Work'} - Priority: ${Task.Priority}`
                list?.appendChild(li);
            });
        })
        .catch((error) => {
            console.log(error);
        })
}

async function createUser (name: string) {
    const results = await fetch(BASE_URL + '/users/add', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(name),
    })
    console.log(results.json());
}

async function loadUserTasks(name: string) {
    console.log(JSON.stringify(name))
    let listArray: [Task];
    const list = document.getElementById('filteredTaskList');
    const results = await fetch(`http://localhost:3000/tasks/`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(name)
    })
    results.json()
        .then((data) => {
            listArray = data;
            listArray.forEach((Task) => {
                let li = document.createElement('li');
                li.innerText = `ID: ${Task.id} Task: ${Task.TaskName} - Progress: ${Task.isDone ? 'DONE' : 'In Work'} - Priority: ${Task.Priority}`
                list?.appendChild(li);
            });
        })
        .catch((error) => {
            console.log(error);
        });

}