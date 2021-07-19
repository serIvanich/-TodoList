import {v1} from "uuid";
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListsActionType,
    todoListID_1,
    todoListID_2
} from "./todolists-reducer";
import {TaskPriorities, tasksApi, TasksStatuses, TasksType} from "../../api/todolist-api";
import {AppRootActionType, AppRootStateType, AppThunkType} from "../../app/store";
import {Dispatch} from "redux";
import {log} from "util";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    [todoListID_1]: [
        {
            id: v1(), title: 'HTML', status: TasksStatuses.New, description: '', completed: true,
            priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_1,
            order: 0, addedDate: ''
        },
        {
            id: v1(), title: 'CSS', status: TasksStatuses.New, description: '', completed: true,
            priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_1,
            order: 0, addedDate: ''
        },
        {
            id: v1(), title: 'React', status: TasksStatuses.Completed, description: '', completed: true,
            priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: todoListID_1,
            order: 0, addedDate: ''
        },
        {
            id: v1(), title: 'JavaScript', status: TasksStatuses.New, description: '', completed: true,
            priority: TaskPriorities.Later, startDate: '', deadline: '', todoListId: todoListID_1,
            order: 0, addedDate: ''
        },
    ],
    [todoListID_2]: [
        {
            id: v1(), title: 'Milk', status: TasksStatuses.Completed, description: '', completed: true,
            priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_2,
            order: 0, addedDate: ''
        },
        {
            id: v1(), title: 'Meat', status: TasksStatuses.New, description: '', completed: true,
            priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_2,
            order: 0, addedDate: ''
        },
        {
            id: v1(), title: 'Bread', status: TasksStatuses.Completed, description: '', completed: true,
            priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_2,
            order: 0, addedDate: ''
        },
    ],
}

export const tasksReducer =
    (state: InitialStateType = initialState,
     action: TaskActionsType): InitialStateType => {
        switch (action.type) {

            case "SET-TASKS":

                return {...state, [action.todoId]: [...action.tasks]}

            case "SET-TODOLISTS": {
                const stateCopy = {...state}
                action.todoLists.forEach(tl => {
                    stateCopy[tl.id] = []
                })
                return stateCopy
            }
            case 'REMOVE_TASK':

                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
                }

            case 'ADD_TASKS':
                return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

            case "UPDATE-TASK":
                return {
                    ...state,
                    [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
                }

            case "ADD-TODOLIST":
                return {
                    ...state,
                    [action.todoList.id]: []
                }

            case "REMOVE-TODOLIST":
                let copyState = {...state}
                delete copyState[action.todoListID]
                return copyState

            default:
                return state
        }
    }

// action

export const removeTaskAC = (taskID: string, todolistId: string) =>
    ({type: 'REMOVE_TASK', taskID, todolistId: todolistId} as const)

export const addTaskAC = (task: TasksType) =>
    ({type: 'ADD_TASKS', task} as const)

export const updateTaskAC = (todoId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', todoId, taskId, model} as const)

const fetchTaskAC = (todoId: string, tasks: TasksType[]) =>
    ({type: 'SET-TASKS', todoId, tasks} as const)

// thunk
export const fetchTasksThunk = (todoId: string): AppThunkType => (dispatch: Dispatch<AppRootActionType>) => {


    tasksApi.getTasks(todoId)
        .then(data => {
            dispatch(fetchTaskAC(todoId, data.items))
        })

        .catch(e => {
            handleServerNetworkError(e.message, dispatch)
        })
}
export const removeTaskThunk = (taskID: string, todolistId: string): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const data = await tasksApi.deleteTask(todolistId, taskID)
        dispatch(removeTaskAC(taskID, todolistId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
export const addTaskThunk = (todoId: string, title: string): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const data = await tasksApi.createTask(todoId, title)
        if (data.resultCode === 0) {
            const task = data.data.item
            dispatch(addTaskAC(task))
            dispatch(setAppStatusAC('succeeded'))
        } else {

            handleServerAppError(data, dispatch)
        }
    } catch (e) {

        handleServerNetworkError(e.message, dispatch)
    }
}
export const updateTaskThunk = (todoId: string, taskId: string, model: UpdateDomainTaskModelType): AppThunkType =>
    async (dispatch,
           getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todoId].find((t) => t.id === taskId)
        if (!task) {
            throw new Error('task not found in the state')
        }
        const domainModel: UpdateDomainTaskModelType = {
            title: task.title,
            status: task.status,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            ...model
        }
        try {
            const data = await tasksApi.updateTask(todoId, taskId, domainModel)
            if (data.resultCode === 0) {
                dispatch(updateTaskAC(todoId, taskId, model))
            } else {
                handleServerAppError(data, dispatch)
            }
        } catch (e) {
            handleServerNetworkError(e.message, dispatch)
        }
    }

// type

export type TaskActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof fetchTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType

type InitialStateType = typeof initialState

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