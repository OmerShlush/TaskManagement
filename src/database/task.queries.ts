import { UserEntity } from "../entity/user.entity";
import { TaskEntity } from "../entity/task.entity";
import { appDataSource } from "./data-source";
export default class TaskQueries {
    

    async createTask(taskName: string, name: string) {
        const user = await appDataSource.getRepository(UserEntity).findOneBy({
            name: name
        })
        const newTask = appDataSource.getRepository(TaskEntity).create({ taskName: taskName, user: user })
        const results = await appDataSource.getRepository(TaskEntity).save(newTask)
        return results;
    }

    async deleteTask(taskId: number) {
        await appDataSource.getRepository(TaskEntity).delete(taskId)
        return {message: 'DELETED'};
    }

    async updateTaskStatus(taskId: number) {
        const task = await appDataSource.getRepository(TaskEntity).findOneBy({
            id: taskId,
        })
        appDataSource.getRepository(TaskEntity).merge(task, { isDone: true })
        const updatedTask = await appDataSource.getRepository(TaskEntity).save(task)
        return updatedTask;
    }

    async updateTaskPriority(taskId: number, priority: number) {
        const task = await appDataSource.getRepository(TaskEntity).findOneBy({
            id: taskId,
        })
        appDataSource.getRepository(TaskEntity).merge(task, { priority: priority })
        const updatedTask = await appDataSource.getRepository(TaskEntity).save(task)
        return updatedTask;
    }

    async getAllTasks() {
        const tasks = await appDataSource.getRepository(TaskEntity).find();
        return tasks;
    }

    async getAllTasksByName(name: string) {
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

    async getFilteredTasks() {
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

}