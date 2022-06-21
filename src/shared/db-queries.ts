import { Task } from '../entity/task.entity';
import { appDataSource } from './data-source';

const createTask = async (TaskName: string) => {
    const newTask = appDataSource.getRepository(Task).create({ TaskName: TaskName })
    const results = await appDataSource.getRepository(Task).save(newTask)
    return results;
}

const deleteTask = async (id: number) => {
    const results = await appDataSource.getRepository(Task).delete(id)
    return results;
}

const updateTaskStatus = async (id: number) => {
    const task = await appDataSource.getRepository(Task).findOneBy({
        id: id,
    })
    appDataSource.getRepository(Task).merge(task, { isDone: true})
    const results = await appDataSource.getRepository(Task).save(task)
    return results;
}

const updateTaskPriority = async (TaskId: number, Priority: number) => {
    const task = await appDataSource.getRepository(Task).findOneBy({
        id: TaskId,
    })
    appDataSource.getRepository(Task).merge(task, { Priority: Priority})
    const results = await appDataSource.getRepository(Task).save(task)
    return results;
}

const getTasks = async () => {
    const tasks = await appDataSource.getRepository(Task).find()
    return tasks;
}

const getFilteredTasks = async () => {
    const tasks = await appDataSource.getRepository(Task).find({
        where: {
            isDone: false
        },
        order: {
            Priority: "ASC",
        }
    })
    return tasks;
  }
  
export { createTask, getTasks, updateTaskStatus, deleteTask, getFilteredTasks, updateTaskPriority }