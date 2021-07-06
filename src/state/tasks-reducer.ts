import {v1} from "uuid";
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListsActionType,
    todoListID_1,
    todoListID_2
} from "./todolists-reducer";
import {TaskPriorities, tasksApi, TasksStatuses, TasksType, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskID: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD_TASKS'
    task: TasksType
}

type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    newStatus: TasksStatuses
    todoListID: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    newTitle: string
    todoListID: string
}


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
type InitialStateType = typeof initialState

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | fetchTaskActionType

export const tasksReducer =
    (state: InitialStateType = initialState,
     action: ActionsType): InitialStateType => {
        switch (action.type) {

            case "SET-TASKS":
                const stateCopy = {...state}
                stateCopy[action.todoId] = action.tasks
                return stateCopy

            case "SET-TODOLISTS":
                const stateCopy1 = {...state}
                action.todoLists.forEach(tl => {
                    stateCopy1[tl.id] = []
                })
                return stateCopy1

            case 'REMOVE_TASK':
                // let todolistTasks = state[action.todolistId]
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
                }

            case 'ADD_TASKS':
                const copyState1 = {...state}
                const tasks = copyState1[action.task.todoListId]
                const newTasks = [action.task, ...tasks]
                copyState1[action.task.todoListId] = newTasks
                return copyState1

            case "CHANGE-TASK-STATUS":
                return {
                    ...state,
                    [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                        ...t,
                        status: action.newStatus
                    } : t)
                }

            case 'CHANGE-TASK-TITLE':
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

export const addTaskAC = (task: TasksType): AddTaskActionType => {
    return {type: 'ADD_TASKS', task}
}

export const changeTaskStatusAC = (taskID: string, newStatus: TasksStatuses, todoListID: string): ChangeTaskStatusActionType => {

    return {type: 'CHANGE-TASK-STATUS', taskID, newStatus, todoListID}
}

export const changeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string): ChangeTaskTitleActionType => {

    return {type: 'CHANGE-TASK-TITLE', taskID, newTitle, todoListID}
}


export const fetchTaskAC = (todoId: string, tasks: TasksType[]) => {
    return {
        type: 'SET-TASKS',
        todoId,
        tasks
    } as const
}

export type fetchTaskActionType = ReturnType<typeof fetchTaskAC>


export const fetchTasksThunk = (todoId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todoId)
        .then(data => {
            dispatch(fetchTaskAC(todoId, data.items))
        })
}

export const removeTaskThunk = (taskID: string, todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskID)
        .then(data => {
            dispatch(removeTaskAC(taskID,todolistId))
        })
}

export const addTaskThunk = (todoId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todoId, title)
        .then(data => {
            debugger
            if (data.resultCode === 0) {
                const task = data.data.item
                dispatch(addTaskAC(task))
            }
        })
}

export const updateTaskStatusThunk = (todoId: string, taskId: string, status: TasksStatuses) => (
    dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()

    const allTasks = state.tasks
    const allTasksForClickedTodo = allTasks[todoId]
    const clickedTask = allTasksForClickedTodo.find((t) => t.id === taskId)

    // const model: any = {...clickedTask, status}
    if(clickedTask) {
        const model: UpdateTaskModelType = {
            title: clickedTask.title,
            status: status,
            description: clickedTask.description,
            deadline: clickedTask.deadline,
            priority: clickedTask.priority,
            startDate: clickedTask.startDate,

        }

        tasksApi.updateTask(todoId, taskId, model)
            .then(data => {


                dispatch(changeTaskStatusAC(taskId, status, todoId))
            })
    }
}
