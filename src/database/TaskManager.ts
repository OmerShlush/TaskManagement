
import TaskQueries from './task.queries';

export default class TaskManager {

    taskQueries = new TaskQueries();

    createTask = async (taskName: string, name: string) => {
        return await this.taskQueries.createTask(taskName, name);
    }

    deleteTask = async (taskId: number) => {
        return await this.taskQueries.deleteTask(taskId);
    }

    updateTaskStatus = async (taskId: number) => {
        return await this.taskQueries.updateTaskStatus(taskId);
    }

    updateTaskPriority = async (taskId: number, priority: number) => {
        return await this.taskQueries.updateTaskPriority(taskId, priority);
    }

    getTasks = async () => {
        return await this.taskQueries.getAllTasks();
    }

    getTasksByName = async (name: string) => {
        return await this.taskQueries.getAllTasksByName(name);        
    }

    getFilteredTasks = async () => {
        return await this.taskQueries.getFilteredTasks();
    }

};