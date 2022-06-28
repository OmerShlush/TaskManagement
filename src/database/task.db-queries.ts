import { TaskEntity } from '../entity/task.entity';
import { UserEntity } from '../entity/user.entity';
import { appDataSource } from './data-source';


export default class TaskManager {

    createTask = async (taskName: string, name: string) => {
        const user = await appDataSource.getRepository(UserEntity).findOne({
        where: {
            name: name
        }
        })
        const newTask = appDataSource.getRepository(TaskEntity).create({ taskName: taskName, user: user })
        const results = await appDataSource.getRepository(TaskEntity).save(newTask)
        return results;
    }

    deleteTask = async (id: number) => {
        await appDataSource.getRepository(TaskEntity).delete(id)
        return;
    }

    updateTaskStatus = async (id: number) => {
        const task = await appDataSource.getRepository(TaskEntity).findOneBy({
            id: id,
        })
        appDataSource.getRepository(TaskEntity).merge(task, { isDone: true})
        const results = await appDataSource.getRepository(TaskEntity).save(task)
        return results;
    }

    updateTaskPriority = async (taskId: number, priority: number) => {
        const task = await appDataSource.getRepository(TaskEntity).findOneBy({
            id: taskId,
        })
        appDataSource.getRepository(TaskEntity).merge(task, { priority: priority})
        const results = await appDataSource.getRepository(TaskEntity).save(task)
        return results;
    }

    getTasks = async () => {
        const tasks = await appDataSource.getRepository(TaskEntity).find()
        return tasks;
    }

    getTasksByName = async (name: string) => {
        const user = await appDataSource.getRepository(UserEntity).findOneBy({
            name: name
        });
        const userId = user.id;
        const tasks = await appDataSource.getRepository(TaskEntity).find({
            where: {
                user: {id: userId}
            }
        })
        return tasks;
        
    }

    getFilteredTasks = async () => {
        const tasks = await appDataSource.getRepository(TaskEntity).find({
            where: {
                isDone: false
            },
            order: {
                priority: "ASC",
            }
        })
        return tasks;
    }

};