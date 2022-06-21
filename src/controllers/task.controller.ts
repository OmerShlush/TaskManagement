import express from 'express';
import { Request, Response } from 'express';
import { 
    createTask, 
    getTasks, 
    deleteTask, 
    updateTaskStatus, 
    getFilteredTasks, 
    updateTaskPriority
} from '../shared/db-queries';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    const TaskName = req.body.TaskName;
    const createdTask = await createTask(TaskName);
    return res.send(createdTask);
});

router.delete('/delete', async (req: Request, res: Response) => {
    const id = req.body.TaskId;
    const deletedTask = await deleteTask(id);
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
    return res.send(updatedTask);
});

router.get('/', async (req: Request, res: Response) => {
    const tasks = await getTasks();
    return res.json(tasks);
});

router.get('/filtered', async (req: Request, res: Response) => {
    const filteredTasks = await getFilteredTasks();
    res.json(filteredTasks);
});

export { router };