import { client } from './client.elasticsearch';

const indexTask = async (taskId: number, userId: number, priority: number) => {
    try {

        await client.index({
            index: 'tasks',
            document: {
                taskId: taskId,
                userId: userId,
                Priority: priority
            }
        })
    } catch (err) {
        console.log(err);
    }
}

const deleteTaskIndex = async (taskId: number) => {
    try{
        const oldTask = await client.search({
            index: 'tasks',
            query: { match: {taskId: taskId}}
        })
        await client.delete({
            index: 'posts',
            id: oldTask.hits.hits[0]._id
        })
    } catch (err) {
        console.log(err);
    }       
}
        
const updateTaskIndex = async (taskId: number, priority: number) => {
    try {
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
    } catch (err) {
        console.log(err);
    }
}

export { indexTask, updateTaskIndex, deleteTaskIndex };