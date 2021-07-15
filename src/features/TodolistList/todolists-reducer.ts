import {v1} from "uuid";
import {todolistApi, TodolistType} from "../../api/todolist-api";
import {AppRootActionType, AppThunkType} from "../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export const todoListID_1 = v1()
export const todoListID_2 = v1()

const initialState = [
    // {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    // {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
] as Array<TodolistDomainType>

export const todoListsReducer = (state: InitialStateType = initialState, action: TodoListActionType): InitialStateType => {
    switch (action.type) {

        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID)

        case "ADD-TODOLIST":
            return [{...action.todoList, filter: 'all', entityStatus: "idle"}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.value} : tl)

        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)

        default:
            return state
    }
}

// actions


export const setTodosAC = (todoLists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', todoLists} as const)
export const removeTodoListAC = (todoListID: string) =>
    ({type: 'REMOVE-TODOLIST', todoListID} as const)
export const addTodoListAC = (todoList: TodolistType) =>
    ({type: 'ADD-TODOLIST', todoList} as const)
export const changeTodoListTitleAC = (todoListID: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', title, todoListID} as const)
export const changeTodoListFilterAC = (value: FilterValuesType, todoListID: string) =>
    ({
        type: 'CHANGE-TODOLIST-FILTER', value, todoListID
    } as const)
export const changeTodoListEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({
        type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus
    } as const)


// thunks

export const fetchTodolistThunk = (): AppThunkType => (dispatch: Dispatch<AppRootActionType>) => {
    dispatch(setAppStatusAC('loading'))

    todolistApi.getTodo()
        .then(data => {
            dispatch(setTodosAC(data))
        })


        .catch(e => {
            handleServerNetworkError(e.message, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodoListThunk = (title: string): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const data = await todolistApi.createTodo(title)
        if (data.resultCode === 0) {
            dispatch(addTodoListAC(data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (data.messages.length) {
                dispatch(setAppErrorAC(data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e) {
        handleServerNetworkError(e.message, dispatch)
    }

}
export const removeTodoListThunk = (todoId: string): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodoListEntityStatusAC(todoId, 'loading'))
        const data = await todolistApi.deleteTodo(todoId)
        if (data.resultCode === 0) {
            dispatch(removeTodoListAC(todoId))
            dispatch(setAppStatusAC('succeeded'))

        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e.message, dispatch)
    }
}
export const updateTodoListThunk = (todoId: string, title: string): AppThunkType => async dispatch => {
    try {
        const data = await todolistApi.updateTodo(todoId, title)
        if (data.resultCode === 0) {
            dispatch(changeTodoListTitleAC(todoId, title))
        }
    } catch (e) {
        handleServerNetworkError(e.message, dispatch)
    }
}

// type

type InitialStateType = typeof initialState

export type SetTodoListsActionType = ReturnType<typeof setTodosAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListEntityStatusActionType = ReturnType<typeof changeTodoListEntityStatusAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type TodoListActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodoListsActionType
    | SetAppStatusActionType
    | ChangeTodoListEntityStatusActionType