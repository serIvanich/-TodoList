import {v1} from "uuid";
import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";

export const todoListID_1 = v1()
export const todoListID_2 = v1()

const initialState = [
    {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
] as Array<TodolistDomainType>

export const todoListsReducer = (state: InitialStateType = initialState, action: ActionUnionType): InitialStateType => {
    switch (action.type) {

        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID)

        case "ADD-TODOLIST":
            return [{...action.todoList,filter: 'all'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.value} : tl)

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
    ({type: 'CHANGE-TODOLIST-FILTER', value, todoListID
} as const)

// thunks

export const fetchTodolistThunk = () => (dispatch: Dispatch) => {
    todolistApi.getTodo()
        .then(data => {
            dispatch(setTodosAC(data))
        })
}
export const addTodoListThunk = (title: string) => (dispatch: Dispatch) => {
    todolistApi.createTodo(title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(addTodoListAC(data.data.item))
            }
        })
}
export const removeTodoListThunk = (todoId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodo(todoId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(removeTodoListAC(todoId))
            }
        })
}
export const updateTodoListThunk = (todoId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodo(todoId, title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoId, title))
            }
        })
}

// type

type InitialStateType = typeof initialState

export type SetTodoListsActionType = ReturnType<typeof setTodosAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }

export type ActionUnionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodoListsActionType