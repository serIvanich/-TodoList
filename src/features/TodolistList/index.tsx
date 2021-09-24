import * as tasksActions from './tasks-actions'
import * as todoListAsyncActions from './todolists-actions'
import {slice} from './todolists-reducer'

const todoListActions = {
    ...todoListAsyncActions,
    ...slice.actions
}

export {
    tasksActions,
    todoListActions
}
