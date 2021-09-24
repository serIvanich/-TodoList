import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import {asyncActions as todoListAsyncActions, slice} from './todolists-reducer'

const todoListActions = {
    ...todoListAsyncActions,
    ...slice.actions
}

const tasksActions = {
    ...tasksAsyncActions
}

export {
    tasksActions,
    todoListActions
}
