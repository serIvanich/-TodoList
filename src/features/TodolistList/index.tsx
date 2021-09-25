import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import {asyncActions as todoListAsyncActions, slice} from './todolists-reducer'
import {TodolistList} from './TodolistList'

const todoListActions = {
    ...todoListAsyncActions,
    ...slice.actions
}

const tasksActions = {
    ...tasksAsyncActions
}

export {
    tasksActions,
    todoListActions,
    TodolistList,
}
