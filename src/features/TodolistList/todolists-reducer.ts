import {v1} from "uuid";
import {todolistApi, TodolistType} from "../../api/todolist-api";
import {AppThunkType} from "../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const todoListID_1 = v1()
export const todoListID_2 = v1()

const initialState = [
    // {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    // {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
] as Array<TodolistDomainType>

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        setTodosAC(state, action: PayloadAction<{ todoLists: TodolistType[] }>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        },
        removeTodoListAC(state, action: PayloadAction<{ todoListID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state.splice(index, 1)
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodolistType }>) {
            state.push({...action.payload.todoList, filter: 'all', entityStatus: "idle"})
        },

        changeTodoListTitleAC(state, action: PayloadAction<{todoListID: string, title: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state[index].title = action.payload.title
        },

        changeTodoListFilterAC(state, action: PayloadAction<{value: FilterValuesType, todoListID: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state[index].filter = action.payload.value
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        }
    }
})

export const {setTodosAC, removeTodoListAC, addTodoListAC, changeTodoListTitleAC,
    changeTodoListFilterAC, changeTodoListEntityStatusAC} = slice.actions

export const todoListsReducer = slice.reducer

// thunks

export const fetchTodolistThunk = (): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))

    todolistApi.getTodo()
        .then(data => {
            dispatch(setTodosAC({todoLists: data}))
        })


        .catch(e => {
            handleServerNetworkError(e.message, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const addTodoListThunk = (title: string): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const data = await todolistApi.createTodo(title)
        if (data.resultCode === 0) {
            dispatch(addTodoListAC({todoList: data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            if (data.messages.length) {
                dispatch(setAppErrorAC({error: data.messages[0]}))
            } else {
                dispatch(setAppErrorAC({error: 'Some error occurred'}))
            }
            dispatch(setAppStatusAC({status: 'failed'}))
        }
    } catch (e) {
        handleServerNetworkError(e.message, dispatch)
    }

}
export const removeTodoListThunk = (todoId: string): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodoListEntityStatusAC({id: todoId, entityStatus: 'loading'}))
        const data = await todolistApi.deleteTodo(todoId)

        if (data.resultCode === 0) {
            dispatch(removeTodoListAC({todoListID: todoId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))

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
            dispatch(changeTodoListTitleAC({todoListID: todoId, title}))
        }
    } catch (e) {
        handleServerNetworkError(e.message, dispatch)
    }
}

// type


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
//     state: InitialStateType = initialState, action: TodoListActionType): InitialStateType => {
//     switch (action.type) {
//
//         case "SET-TODOLISTS":
//
//
//         case 'REMOVE-TODOLIST':
//             return state.filter(tl => tl.id !== action.todoListID)
//
//         case "ADD-TODOLIST":
//             return [{...action.todoList, filter: 'all', entityStatus: "idle"}, ...state]
//
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
//
//         case "CHANGE-TODOLIST-FILTER":
//             return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.value} : tl)
//
//         case "CHANGE-TODOLIST-ENTITY-STATUS":
//             return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
//
//         default:
//             return state
//     }
// }

// actions

//
// export const setTodosAC = (todoLists: TodolistType[]) =>
//     ({type: 'SET-TODOLISTS', todoLists} as const)
// export const removeTodoListAC = (todoListID: string) =>
//     ({type: 'REMOVE-TODOLIST', todoListID} as const)
// export const addTodoListAC = (todoList: TodolistType) =>
//     ({type: 'ADD-TODOLIST', todoList} as const)
// export const changeTodoListTitleAC = (todoListID: string, title: string) =>
//     ({type: 'CHANGE-TODOLIST-TITLE', title, todoListID} as const)
// export const changeTodoListFilterAC = (value: FilterValuesType, todoListID: string) =>
//     ({
//         type: 'CHANGE-TODOLIST-FILTER', value, todoListID
//     } as const)
// export const changeTodoListEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
//     ({
//         type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus
//     } as const)
//


// type InitialStateType = typeof initialState
//
// export type SetTodoListsActionType = ReturnType<typeof setTodosAC>
// export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
// export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
// export type ChangeTodoListEntityStatusActionType = ReturnType<typeof changeTodoListEntityStatusAC>


// export type TodoListActionType =
//     RemoveTodoListActionType
//     | AddTodoListActionType
//     | ReturnType<typeof changeTodoListTitleAC>
//     | ReturnType<typeof changeTodoListFilterAC>
//     | SetTodoListsActionType
//     | ChangeTodoListEntityStatusActionType