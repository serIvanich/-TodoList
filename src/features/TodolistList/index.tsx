import {asyncActions as tasksAsyncActions, slice as tasksSlice} from './tasks-reducer'
import {asyncActions as todoListAsyncActions, slice as todoListsSlice} from './todolists-reducer'
import {TodolistList} from './TodolistList'

const todoListActions = {
    ...todoListAsyncActions,
    ...todoListsSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

const todoListsReducer = todoListsSlice.reducer
const tasksReducer = tasksSlice.reducer

export {
    tasksActions,
    todoListActions,
    todoListsReducer,
    tasksReducer,
    TodolistList,

}
