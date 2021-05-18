import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
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

export type ActionUnionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType
export const todoListsReducer =
    (todoLists: Array<TodoListType>,
    action: ActionUnionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodoListType = {id: newTodoListID, title: action.title, filter: 'all'}

            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.value} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', todoListID}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title}
}
export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todoListID}
}
export const ChangeTodoListFilterAC = (value: FilterValuesType, todoListID: string): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', value, todoListID}
}
