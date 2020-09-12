import { ADD_TODO_TASK, UPDATE_COLUMNS, DELETE_TASK } from './constants'

export const AddTodoTask = (task) => ({
    type: ADD_TODO_TASK,
    payload: task
})


export const updateColumn = (updatedColumns) => ({
    type: UPDATE_COLUMNS,
    payload: updatedColumns
})

export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId
})

