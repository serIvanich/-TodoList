import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todoListID_1, todoListID_2} from "./todolists-reducer";
import {TaskPriorities, TasksStatuses, TasksType} from "../api/todolist-api";


type RemoveTaskActionType = {
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
    newStatus: TasksStatuses
    todoListID: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskID: string
    newTitle: string
    todoListID: string
}



const initialState = {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', status: TasksStatuses.New, description: '', completed: true,
            priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_1,
            order: 0, addedDate: ''},
            {id: v1(), title: 'CSS', status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_1,
                order: 0, addedDate: ''},
            {id: v1(), title: 'React', status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: todoListID_1,
                order: 0, addedDate: ''},
            {id: v1(), title: 'JavaScript', status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Later, startDate: '', deadline: '', todoListId: todoListID_1,
                order: 0, addedDate: ''},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_2,
                order: 0, addedDate: ''},
            {id: v1(), title: 'Meat', status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_2,
                order: 0, addedDate: ''},
            {id: v1(), title: 'Bread', status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: todoListID_2,
                order: 0, addedDate: ''},
        ],
    }
type InitialStateType = typeof initialState

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export const tasksReducer =
    (state: InitialStateType = initialState,
     action: ActionsType): InitialStateType => {
        switch (action.type) {
            case 'REMOVE_TASK':
                // let todolistTasks = state[action.todolistId]
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
                }
            case 'ADD_TASKS':
                const newTask: TasksType = {
                    id: v1(),
                    title: action.title,
                    status: TasksStatuses.New,
                    description: '',
                    completed: true,
                    priority: TaskPriorities.Hi,
                    startDate: '',
                    deadline: '',
                    todoListId: action.todoListID,
                    order: 0,
                    addedDate: ''

                }
                return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}

            case "CHANGE_TASK_STATUS":
                return {
                    ...state,
                    [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                        ...t,
                        status: action.newStatus
                    }: t )
                }
            case "CHANGE_TASK_TITLE":
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
                return state
        }
    }

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskID, todolistId: todolistId}
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD_TASKS', title, todoListID}
}

export const changeTaskStatusAC = (taskID: string, newStatus: TasksStatuses, todoListID: string): ChangeTaskStatusActionType => {

    return {type: 'CHANGE_TASK_STATUS', taskID, newStatus, todoListID}
}

export const changeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string): ChangeTaskTitleActionType => {

    return {type: 'CHANGE_TASK_TITLE', taskID, newTitle, todoListID}
}

