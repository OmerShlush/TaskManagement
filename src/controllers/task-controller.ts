import express from 'express';
import { 
    createTask, 
    getTasks, 
    deleteTask, 
    updateTaskStatus, 
    getFilteredTasks, 
    updateTaskPriority
} from '../shared/dbQueries';

const router = express.Router();

// Create Task 
router.post('/create', createTask);

// Delete Task
router.post('/delete', deleteTask);

// Update Task Priority
router.post('/updatePriority', updateTaskPriority);

// Update Task Status
router.post('/update', updateTaskStatus);

// Get All Tasks
router.get('/', getTasks);

// Get Tasks filtered by status (not done yet) and sorted by priority
router.get('/filtered', getFilteredTasks);


export { router };