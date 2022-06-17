function deleteTask(taskId) {
    fetch('http://localhost:3000/tasks/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskId)
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('Success:', data);
    })["catch"](function (error) {
        console.error('Error:', error);
    });
}
function createTask(task) {
    fetch('http://localhost:3000/tasks/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('Success:', data);
    })["catch"](function (error) {
        console.error('Error:', error);
    });
}
function updateTask(taskId) {
    fetch('http://localhost:3000/tasks/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskId)
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('Success:', data);
    })["catch"](function (error) {
        console.error('Error:', error);
    });
}
function updateTaskPriority(data) {
    fetch('http://localhost:3000/tasks/updatePriority', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('Success:', data);
    })["catch"](function (error) {
        console.error('Error:', error);
    });
}
function getTaskList() {
    var listArray;
    var list = document.getElementById('tasksList');
    fetch('http://localhost:3000/tasks/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('Success:', data);
        listArray = data;
        listArray.forEach(function (Task) {
            var li = document.createElement('li');
            li.innerText = "ID: ".concat(Task.id, " Task: ").concat(Task.TaskName, " - Progress: ").concat(Task.isDone ? 'DONE' : 'In Work', " - Priority: ").concat(Task.Priority);
            list === null || list === void 0 ? void 0 : list.appendChild(li);
        });
    })["catch"](function (error) {
        console.error('Error:', error);
    });
}
function getFilteredTasks() {
    var listArray;
    var list = document.getElementById('filteredTaskList');
    fetch('http://localhost:3000/tasks/filtered', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('Success:', data);
        listArray = data;
        listArray.forEach(function (Task) {
            var li = document.createElement('li');
            li.innerText = "ID: ".concat(Task.id, " Task: ").concat(Task.TaskName, " - Progress: ").concat(Task.isDone ? 'DONE' : 'In Work', " - Priority: ").concat(Task.Priority);
            list === null || list === void 0 ? void 0 : list.appendChild(li);
        });
    })["catch"](function (error) {
        console.error('Error:', error);
    });
}
