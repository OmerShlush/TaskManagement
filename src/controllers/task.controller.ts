import express from 'express';
import { Request, Response } from 'express';
import { indexTask, updateTaskIndex, deleteTaskIndex } from '../elasticsearch/es-queries';
import { 
    createTask, 
    getTasks, 
    getTasksByName,
    deleteTask, 
    updateTaskStatus, 
    getFilteredTasks, 
    updateTaskPriority
} from '../shared/task.db-queries';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    const taskName = req.body.TaskName;
    const name = req.body.name;
    const createdTask = await createTask(taskName, name);
    await indexTask(createdTask.id, createdTask.user.id, createdTask.Priority);
    return res.send(createdTask);
});

router.delete('/delete', async (req: Request, res: Response) => {
    const id = req.body.TaskId;
    const deletedTask = await deleteTask(id);
    await deleteTaskIndex(id);
    return res.send(deletedTask);
});

router.put('/updateStatus', async (req: Request, res: Response) => {
    const id = req.body.TaskId;
    const updatedTask = await updateTaskStatus(id);
    return res.send(updatedTask);
});

router.put('/updatePriority', async (req: Request, res: Response) => {
    const { TaskId, Priority } = req.body;
    const updatedTask = await updateTaskPriority(TaskId, Priority);
    await updateTaskIndex(TaskId, Priority);
    return res.send(updatedTask);
});

router.post('/', async (req: Request, res: Response) => {
    const { name } = req.body;
    const tasks = await getTasksByName(name);
    return res.json(tasks);
});

router.get('/', async (req: Request, res: Response) => {
    const tasks = await getTasks();
    return res.json(tasks);
});

router.get('/filtered', async (req: Request, res: Response) => {
    const filteredTasks = await getFilteredTasks();
    return res.json(filteredTasks);
});


export { router };