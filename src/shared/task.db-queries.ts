import { updateTaskIndex } from '../elasticsearch/es-queries';
import { Task } from '../entity/task.entity';
import { User } from '../entity/user.entity';
import { appDataSource } from './data-source';

const createTask = async (taskName: string, name: string) => {
    const user = await appDataSource.getRepository(User).findOne({
        where: {
            name: name
        }
    })
    const newTask = appDataSource.getRepository(Task).create({ TaskName: taskName, user: user })
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

const updateTaskPriority = async (taskId: number, priority: number) => {
    const task = await appDataSource.getRepository(Task).findOneBy({
        id: taskId,
    })
    appDataSource.getRepository(Task).merge(task, { Priority: priority})
    const results = await appDataSource.getRepository(Task).save(task)
    return results;
}

const getTasks = async () => {
    const tasks = await appDataSource.getRepository(Task).find()
    return tasks;
}

const getTasksByName = async (name: string) => {
    const user = await appDataSource.getRepository(User).findOneBy({
        name: name
    });
    const userId = user.id;
    const tasks = await appDataSource.getRepository(Task).find({
        where: {
            user: {id: userId}
        }
    })
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
  
export { createTask, getTasks, getTasksByName, updateTaskStatus, deleteTask, getFilteredTasks, updateTaskPriority }