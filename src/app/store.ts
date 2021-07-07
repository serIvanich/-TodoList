import {TaskActionsType, tasksReducer} from '../features/TodolistList/tasks-reducer';
import {TodoListActionType, todoListsReducer} from '../features/TodolistList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})
// непосредственно создаём state
export const store = createStore(rootReducer, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = TodoListActionType | TaskActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

// а это, чтобы можно было в консоли браузера обращаться к state в любой момент
// @ts-ignore
window.store = store;

