import express from 'express';
import { Request, Response } from 'express';
import { indexTask, updateTaskIndex, deleteTaskIndex } from '../elasticsearch/es-queries';
import { Log } from '../elasticsearch/logstash/server.logstash';
import TaskManager from '../database/task.db-queries';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    const taskName = req.body.TaskName;
    const name = req.body.name;
    const createdTask = await new TaskManager().createTask(taskName, name);
    await indexTask(createdTask.id, createdTask.user.id, createdTask.priority);
    Log(createdTask);
    return res.send(createdTask);
});

router.delete('/delete', async (req: Request, res: Response) => {
    const id = req.body.TaskId;
    const deletedTask = await new TaskManager().deleteTask(id);
    await deleteTaskIndex(id);
    return res.send(deletedTask);
});

router.put('/updateStatus', async (req: Request, res: Response) => {
    const id = req.body.TaskId;
    const updatedTask = await new TaskManager().updateTaskStatus(id);
    Log(updatedTask);
    return res.send(updatedTask);
});

router.put('/updatePriority', async (req: Request, res: Response) => {
    const { TaskId, Priority } = req.body;
    const updatedTask = await new TaskManager().updateTaskPriority(TaskId, Priority);
    await updateTaskIndex(TaskId, Priority);
    Log({id: TaskId, priority: Priority})
    return res.send(updatedTask);
});

router.post('/', async (req: Request, res: Response) => {
    const { name } = req.body;
    const tasks = await new TaskManager().getTasksByName(name);
    return res.json(tasks);
});

router.get('/', async (req: Request, res: Response) => {
    const tasks = await new TaskManager().getTasks();
    return res.json(tasks);
});

router.get('/filtered', async (req: Request, res: Response) => {
    const filteredTasks = await new TaskManager().getFilteredTasks();
    return res.json(filteredTasks);
});


export { router };