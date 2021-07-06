import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export const todoListID_1 = v1()
export const todoListID_2 = v1()

export type SetTodoListsActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodolistType>
}
export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    value: FilterValuesType
    todoListID: string
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


const initialState = [
    {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
] as Array<TodolistDomainType>
type InitialStateType = typeof initialState

export type ActionUnionType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodoListsActionType

export const todoListsReducer = (state: InitialStateType = initialState, action: ActionUnionType): InitialStateType => {
    switch (action.type) {

        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({
                ...tl,
                    filter: 'all'
            }))

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID)

        case "ADD-TODOLIST":
            const newTodoList: TodolistDomainType = {
                id: action.todolistId, title: action.title,
                filter: 'all', addedDate: '', order: 0
            }
            return [...state, newTodoList]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.value} : tl)

        default:
            return state
    }
}

export const SetTodosAC = (todoLists: TodolistType[]): SetTodoListsActionType => {
    return {
        type: 'SET-TODOLISTS',
        todoLists
    }
 }

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', todoListID}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todoListID}
}
export const ChangeTodoListFilterAC = (value: FilterValuesType, todoListID: string): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', value, todoListID}
}

export const fetchTodolistThunk = () => (dispatch: Dispatch) => {

    todolistApi.getTodo()
        .then(data => {
            dispatch(SetTodosAC(data))
        })
}