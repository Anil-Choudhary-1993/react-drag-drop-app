import initialState from './initial-data'
import { ADD_TODO_TASK, UPDATE_COLUMNS, DELETE_TASK } from '../Actions/constants'

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_TASK: {
            let deleteTaskId = action.payload
            let newtaskIds = state.columns['column-3'].taskIds.filter(id => {
                if (id !== deleteTaskId) {
                    return true
                } else {
                    return false
                }
            })
            let column = state.columns['column-3']
            let updatedColumn = {
                'column-3': {
                    ...column, taskIds: newtaskIds
                }
            }
            let updatedColumns = {
                ...state.columns, ...updatedColumn
            }

            let newUpdatedTasks = Object.keys(state.tasks)
                .filter(key => !deleteTaskId.includes(key))
                .reduce((obj, key) => {
                    obj[key] = state.tasks[key];
                    return obj;
                }, {});

            return {
                ...state,
                columns: updatedColumns,
                tasks: newUpdatedTasks
            }
        }
        case UPDATE_COLUMNS: {
            return {
                ...state,
                ...action.payload
            }
        }
        case ADD_TODO_TASK:
            {
                const prevStateTasks = state.tasks
                let newStateTasks = {}
                let taskId = ''
                let updatedColumnsTasksId = {}

                if (Object.keys(prevStateTasks).length) {  /// if tasks already exits

                    taskId = Object.keys(prevStateTasks)[Object.keys(prevStateTasks).length - 1]
                    taskId = 'task-' + (parseInt(taskId.substr(taskId.length - 1)) + 1)
                    newStateTasks = {
                        ...state.tasks,
                        [taskId]: { id: taskId, content: action.payload }
                    }

                } else {
                    state.tasks = {
                        'task-1': { id: 'task-1', content: action.payload }
                    }
                }

                updatedColumnsTasksId = {
                    'column-1': {
                        id: 'column-1',
                        title: 'To do',
                        taskIds: state.columns['column-1'].taskIds.concat(taskId)
                    }
                }
                let newColumns = {
                    ...state.columns,
                    ...updatedColumnsTasksId
                }

                return {
                    ...state,
                    tasks: newStateTasks,
                    columns: { ...newColumns }
                }
            }
        default:
            return state
    }
}