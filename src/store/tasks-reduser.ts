import {TasksStateType, TaskType} from "../App"
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";


type ReamoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskID: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD_TASKS'
    title: string
    todoListID: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskID: string
    newIsDoneValue: boolean
    todoListID: string
}

type ChangeTaskTitleActionType = {
    type: 'GHANGE_TASK_TITLE'
    taskID: string
    newTitle: string
    todoListID: string
}


export type ActionsType = ReamoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export const tasksReducer =
    (state: TasksStateType,
     action: ActionsType): TasksStateType => {
        switch (action.type) {
            case 'REMOVE_TASK':
                // let todolistTasks = state[action.todolistId]
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
                }
            case 'ADD_TASKS':
                const newTask: TaskType = {
                    id: action.todoListID,
                    title: action.title,
                    isDone: false
                }
                return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}

            case "CHANGE_TASK_STATUS":
                return {
                    ...state,
                    [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                        ...t,
                        isDone: action.newIsDoneValue
                    } : t)
                }
            case "GHANGE_TASK_TITLE":
                return {
                    ...state,
                    [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                        ...t,
                        title: action.newTitle
                    } : t)
                }
            case "ADD-TODOLIST":
                return {
                    ...state,
                    [action.todolistId]: []
                }
            case "REMOVE-TODOLIST":
                let copyState = {...state}
                delete copyState[action.todoListID]
                return copyState

            default:
                throw new Error('i dont')
        }
    }

export const removeTaskAC = (taskID: string, todolistId: string): ReamoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskID, todolistId: todolistId}
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD_TASKS', title, todoListID}
}

export const changeTaskStatusAC = (taskID: string, newIsDoneValue: boolean, todoListID: string): ChangeTaskStatusActionType => {

    return {type: 'CHANGE_TASK_STATUS', taskID, newIsDoneValue, todoListID}
}

export const changeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string): ChangeTaskTitleActionType => {

    return {type: 'GHANGE_TASK_TITLE', taskID, newTitle, todoListID}
}

