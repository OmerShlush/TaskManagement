import { client } from './client.elasticsearch';


const indexTask = async (taskId: number, userId: number, priority: number) => {
    await client.index({
        index: 'tasks',
        document: {
            taskId: taskId,
            userId: userId,
            Priority: priority
        }
    })
}

const deleteTaskIndex = async (taskId: number) => {
    const oldTask = await client.search({
        index: 'tasks',
        query: { match: {taskId: taskId}}
    })
    // await client.delete({
    //     index: 'posts',
    //     id: oldTask.hits.hits[0]._id
    // })

}

const updateTaskIndex = async (taskId: number, priority: number) => {
    const oldTask = await client.search({
        index: 'tasks',
        query: { match: {taskId: taskId}}
    })
    await client.update({
        index: 'tasks',
        id: oldTask.hits.hits[0]._id,
        doc: {
            Priority: priority
        }
    })
}

export { indexTask, updateTaskIndex, deleteTaskIndex };