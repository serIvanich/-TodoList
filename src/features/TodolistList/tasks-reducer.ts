import {tasksApi, TasksStatuses, TasksType} from "../../api/todolist-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppRootStateType} from "../../app/store";
import {asyncActions as asyncTodoListActions} from "./todolists-reducer";


const fetchTasks = createAsyncThunk('tasks/fetchTasks',
    async (param: { todoListId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {

            const data = await tasksApi.getTasks(param.todoListId)
            const tasks = data.items
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todoListId: param.todoListId, tasks}
        } catch (e) {
            handleServerNetworkError(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })
const removeTask = createAsyncThunk('tasks/removeTask',
    async (param: { taskId: string, todolistId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await tasksApi.deleteTask(param.todolistId, param.taskId)
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return param
        } catch (e) {
            handleServerNetworkError(e.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }

    })
const addTask = createAsyncThunk('tasks/addTask',
    async (param: { title: string, todoListId: string}, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const data = await tasksApi.createTask(param.todoListId, param.title)
            if (data.resultCode === 0) {
                // const task = data.data.item
                // dispatch(addTaskAC(task))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return data.data.item
            } else {
                handleServerAppError(data, dispatch)
                return rejectWithValue({})
            }
        } catch (e) {
            handleServerNetworkError(e.message, dispatch)
            return rejectWithValue({})
        }
    })
const updateTask = createAsyncThunk
('tasks/updateTask',async (param: { todoListId: string, taskId: string, model: UpdateDomainTaskModelType }, {
        getState,
        dispatch,
        rejectWithValue
    }) => {
        const state = getState() as AppRootStateType
        const task = state.tasks[param.todoListId].find((t) => t.id === param.taskId)

        if (!task) {

            return rejectWithValue('task not found in the state')
        }
        const domainModel: UpdateDomainTaskModelType = {
            title: task.title,
            status: task.status,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            ...param.model
        }
        try {
            const data = await tasksApi.updateTask(param.todoListId, param.taskId, domainModel)
            if (data.resultCode === 0) {

                return param
            } else {
                handleServerAppError(data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e.message, dispatch)
            return rejectWithValue(null)
        }
    })

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask,
}

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncTodoListActions.addTodoList.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(asyncTodoListActions.removeTodoList.fulfilled, (state, action) => {
            delete state[action.payload.todoListId]
        })
        builder.addCase(asyncTodoListActions.fetchTodolist.fulfilled, (state, action) => {
            action.payload.todoLists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(asyncActions.fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todoListId] = action.payload.tasks
        })
        builder.addCase(asyncActions.removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            //@ts-ignore
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            //@ts-ignore
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})

export const tasksReducer = slice.reducer


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TasksStatuses
    priority?: number
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}


// const initialState = {
// [todoListID_1]: [
//     {
//         id: v1(), title: 'HTML', status: TasksStatuses.New, description: '', completed: true,
//         priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_1,
//         order: 0, addedDate: ''
//     },
//     {
//         id: v1(), title: 'CSS', status: TasksStatuses.New, description: '', completed: true,
//         priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_1,
//         order: 0, addedDate: ''
//     },
//     {
//         id: v1(), title: 'React', status: TasksStatuses.Completed, description: '', completed: true,
//         priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: todoListID_1,
//         order: 0, addedDate: ''
//     },
//     {
//         id: v1(), title: 'JavaScript', status: TasksStatuses.New, description: '', completed: true,
//         priority: TaskPriorities.Later, startDate: '', deadline: '', todoListId: todoListID_1,
//         order: 0, addedDate: ''
//     },
// ],
// [todoListID_2]: [
//     {
//         id: v1(), title: 'Milk', status: TasksStatuses.Completed, description: '', completed: true,
//         priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_2,
//         order: 0, addedDate: ''
//     },
//     {
//         id: v1(), title: 'Meat', status: TasksStatuses.New, description: '', completed: true,
//         priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_2,
//         order: 0, addedDate: ''
//     },
//     {
//         id: v1(), title: 'Bread', status: TasksStatuses.Completed, description: '', completed: true,
//         priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_2,
//         order: 0, addedDate: ''
//     },
// ],
// } as TasksStateType
// export const removeTaskThunk_ = (taskID: string, todolistId: string): AppThunkType => async dispatch => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         const data = await tasksApi.deleteTask(todolistId, taskID)
//         dispatch(removeTaskAC({taskID, todolistId}))
//         dispatch(setAppStatusAC({status: 'succeeded'}))
//     } catch (e) {
//         handleServerNetworkError(e, dispatch)
//     }
// }
// export const addTaskThunk = (todoId: string, title: string): AppThunkType => async dispatch => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         const data = await tasksApi.createTask(todoId, title)
//         if (data.resultCode === 0) {
//             const task = data.data.item
//             dispatch(addTaskAC(task))
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         } else {
//
//             handleServerAppError(data, dispatch)
//         }
//     } catch (e) {
//
//         handleServerNetworkError(e.message, dispatch)
//     }
// }
// export const updateTaskThunk_ = (todoId: string, taskId: string, model: UpdateDomainTaskModelType): AppThunkType =>
//     async (dispatch,
//            getState: () => AppRootStateType) => {
//         const state = getState()
//         const task = state.tasks[todoId].find((t) => t.id === taskId)
//         if (!task) {
//             throw new Error('task not found in the state')
//         }
//         const domainModel: UpdateDomainTaskModelType = {
//             title: task.title,
//             status: task.status,
//             description: task.description,
//             deadline: task.deadline,
//             priority: task.priority,
//             startDate: task.startDate,
//             ...model
//         }
//         try {
//             const data = await tasksApi.updateTask(todoId, taskId, domainModel)
//             if (data.resultCode === 0) {
//                 dispatch(updateTaskAC({todoId, taskId, model}))
//             } else {
//                 handleServerAppError(data, dispatch)
//             }
//         } catch (e) {
//             handleServerNetworkError(e.message, dispatch)
//         }
//     }
//


// removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistId: string }>) {
//     const tasks = state[action.payload.todolistId]
//     const index = tasks.findIndex(t => t.id === action.payload.taskID)
//     if (index > -1) {
//         tasks.splice(index, 1)
//     }
// },
// addTaskAC(state, action: PayloadAction<TasksType>) {
//     state[action.payload.todoListId].unshift(action.payload)
// },
// updateTaskAC(state, action: PayloadAction<{ todoId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
//     const tasks = state[action.payload.todoId]
//     const index = tasks.findIndex(t => t.id === action.payload.taskId)
//     if (index > -1) {
//         tasks[index] = {...tasks[index], ...action.payload.model}
//     }
// },
// fetchTaskAC(state, action: PayloadAction<{ todoId: string, tasks: TasksType[] }>) {
//     state[action.payload.todoId] = action.payload.tasks
// },

// export const {updateTaskAC} = slice.actions
//     (state: InitialStateType = initialState,
//      action: any): InitialStateType => {
//         switch (action.type) {
//
//             case "SET-TASKS":
//
//                 return {...state, [action.todoId]: [...action.tasks]}
//
//             case setTodosAC.type: {
//                 const stateCopy = {...state}
//                 action.todoLists.forEach((tl: any) => {
//                     stateCopy[tl.id] = []
//                 })
//                 return stateCopy
//             }
//             case 'REMOVE_TASK':
//
//                 return {
//                     ...state,
//                     [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
//                 }
//
//             case 'ADD_TASKS':
//                 return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//
//             case "UPDATE-TASK":
//                 return {
//                     ...state,
//                     [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
//                 }
//
//             case addTodoListAC.type:
//                 return {
//                     ...state,
//                     [action.todoList.id]: []
//                 }
//
//             case removeTodoListAC.type:
//                 let copyState = {...state}
//                 delete copyState[action.todoListID]
//                 return copyState
//
//             default:
//                 return state
//         }
//     }
//
// // action
//
// export const removeTaskAC = (taskID: string, todolistId: string) =>
//     ({type: 'REMOVE_TASK', taskID, todolistId: todolistId} as const)
//
// export const addTaskAC = (task: TasksType) =>
//     ({type: 'ADD_TASKS', task} as const)
//
// export const updateTaskAC = (todoId: string, taskId: string, model: UpdateDomainTaskModelType) =>
//     ({type: 'UPDATE-TASK', todoId, taskId, model} as const)
//
// const fetchTaskAC = (todoId: string, tasks: TasksType[]) =>
//     ({type: 'SET-TASKS', todoId, tasks} as const)


// .catch(e => {
//     handleServerNetworkError(e.message, thunkAPI.dispatch)
// })
// }

// thunk
// export const fetchTasksThunk_ = (todoId: string): AppThunkType => (dispatch: Dispatch) => {
//
//
//     tasksApi.getTasks(todoId)
//         .then(data => {
//             const tasks = data.items
//             dispatch(fetchTasks{todoId, tasks}))
//         })
//
//         .catch(e => {
//             handleServerNetworkError(e.message, dispatch)
//         })
// }

// type

// export type TaskActionsType =
//     ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof fetchTaskAC>
//     | ReturnType<typeof updateTaskAC>
//


