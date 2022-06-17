import { Request, Response } from 'express';
import mysql from 'mysql2';
import { StatusCodes } from 'http-status-codes';

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'omerdevs',
    password: 'omerdevs',
    database: 'tasks',
    debug: false
})



// Create Task (Recives Task Name && ?priority)
const createTask = (req: Request, res: Response) => {
    const TaskName = req.body.TaskName;

    const query = `INSERT INTO tasks (TaskName) VALUES ('${TaskName}')`;
    pool.query(query,
        (err, results) => 
        {
            if (err) return console.log(err);
            res.status(StatusCodes.OK).json({
                message: 'Task created successfully..',
                TaskId: TaskName
            });
        }
        
    )
  }

// Delete Task (Recieves Task ID)
const deleteTask = (req: Request, res: Response) => {
    const id = req.body.TaskId;
    const query = `DELETE FROM tasks WHERE id = ${id}`;
    pool.query(query, (error, results) => {
        if(error) {
            return console.log(error);
        }
        res.status(StatusCodes.OK).json({
            message: 'Task deleted successfully..',
            TaskId: id
        });
    })
}

// Update Task Status 
const updateTaskStatus = (req: Request, res: Response) => {
    const id = req.body.TaskId;
    const query = `UPDATE tasks SET isDone = 1 WHERE id = ${id}`;
    pool.query(query, (error, results) => {
        if(error) {
            return console.log(error);
        }
        res.status(StatusCodes.OK).json({
            message: 'Task Status Updated.',
            TaskId: id
        });
    })
}

// Update Task Priority By ID
const updateTaskPriority = (req: Request, res: Response) => {
    const { TaskId, Priority } = req.body;
    const query = `UPDATE tasks SET Priority = ${Priority} WHERE id = ${TaskId}`;
    pool.query(query, (error, results) => {
        if(error) {
            return console.log(error);
        }
        res.status(StatusCodes.OK).json({
            message: 'Task Priority Updated.',
            TaskId: TaskId,
            Priority: Priority
        });
    })
}

// Get All Tasks
const getTasks = (req: Request, res: Response) => {
    pool.query('SELECT * FROM tasks ORDER BY Priority ASC', (error, results) => {
        if (error) {
            return console.log(error);
        }
        res.status(StatusCodes.OK).json(results);
    })
  }
  

// Get Tasks filtered by status (not done yet) and sorted by priority
const getFilteredTasks = (req: Request, res: Response) => {
    pool.query(`SELECT * FROM tasks WHERE isDone = '1' ORDER BY Priority ASC`, (error, results) => {
        if (error) {
            return console.log(error);
        }
        res.status(StatusCodes.OK).json(results);
    })
  }
  

export { createTask, getTasks, updateTaskStatus, deleteTask, getFilteredTasks, updateTaskPriority }