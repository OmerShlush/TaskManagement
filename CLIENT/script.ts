interface Task {
    id?: number,
    taskName: string,
    isDone: boolean,
    priority?: number,
    name?: string
}
import axios from 'axios';

async function deleteTask (taskId: number) {
    const results = await fetch(`http://localhost:3000/tasks/delete`, 
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskId),
    })
    console.log(await results.json());
}

async function createTask(task: Task) {
    const results = await fetch(`http://localhost:3000/tasks/create`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    console.log(results);
}

async function updateTask(taskId: number) {
    const results = await fetch('http://localhost:3000/tasks/updateStatus', 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskId),
    })
    console.log(await results.json())
}

async function updateTaskpriority(data: {taskId: number, priority: number}) {

    const results = await fetch('http://localhost:3000/tasks/updatepriority', 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    console.log(await results.json());
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
            li.innerText = `ID: ${Task.id} Task: ${Task.taskName} - Progress: ${Task.isDone ? 'DONE' : 'In Work'} - priority: ${Task.priority}`
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
    const results = await fetch('http://localhost:3000/tasks/filtered', 
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    await results.json()
        .then(data => {
            listArray = data;
            listArray.forEach((Task) => {
                let li = document.createElement('li');
                li.innerText = `ID: ${Task.id} Task: ${Task.taskName} - Progress: ${Task.isDone ? 'DONE' : 'In Work'} - priority: ${Task.priority}`
                list?.appendChild(li);
            });
        })
        .catch((error) => {
            console.log(error);
        })
}

async function createUser (name: string) {
    const results = await fetch('http://localhost:3000/users/add', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(name),
    })
    console.log(await results.json());
}

async function loadUserTasks(name: string) {
    console.log(JSON.stringify(name))
    let listArray: [Task];
    const list = document.getElementById('filteredTaskList');
    try {
        const results = await fetch(`http://localhost:3000/tasks/`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(name)
        })
        const listArray = await results.json();
        listArray.forEach((Task: Task) => {
            let li = document.createElement('li');
            li.innerText = `ID: ${Task.id} Task: ${Task.taskName} - Progress: ${Task.isDone ? 'DONE' : 'In Work'} - priority: ${Task.priority}`
            list?.appendChild(li);
        });
        
    } catch (error) {
        console.log(error);
    }
}