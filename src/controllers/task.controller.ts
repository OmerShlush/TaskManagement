import express from 'express';
import { Request, Response } from 'express';
import { indexTask, updateTaskIndex, deleteTaskIndex } from '../elasticsearch/es-queries';
import { Log } from '../elasticsearch/logstash/server.logstash';
import TaskManager from '../database/task.db-queries';

const router = express.Router();

const taskManager = new TaskManager();

router.post('/create', async (req: Request, res: Response) => {
    const { taskName, name } = req.body;
    const createdTask = await taskManager.createTask(taskName, name);
    await indexTask(createdTask.id, createdTask.user.id, createdTask.priority);
    Log(createdTask);
    return res.send(createdTask);
});

router.delete('/delete', async (req: Request, res: Response) => {
    const id = req.body.taskId;
    const deletedTask = await taskManager.deleteTask(id);
    await deleteTaskIndex(id);
    return res.send(deletedTask);
});

router.put('/updateStatus', async (req: Request, res: Response) => {
    const id = req.body.taskId;
    const updatedTask = await taskManager.updateTaskStatus(id);
    Log(updatedTask);
    return res.send(updatedTask);
});

router.put('/updatePriority', async (req: Request, res: Response) => {
    const { taskId, Priority } = req.body;
    const updatedTask = await taskManager.updateTaskPriority(taskId, Priority);
    await updateTaskIndex(taskId, Priority);
    Log({id: taskId, priority: Priority})
    return res.send(updatedTask);
});

router.post('/', async (req: Request, res: Response) => {
    const { name } = req.body;
    const tasks = await taskManager.getTasksByName(name);
    return res.json(tasks);
});

router.get('/', async (req: Request, res: Response) => {
    const tasks = await taskManager.getTasks();
    return res.json(tasks);
});

router.get('/filtered', async (req: Request, res: Response) => {
    const filteredTasks = await taskManager.getFilteredTasks();
    return res.json(filteredTasks);
});


export { router };