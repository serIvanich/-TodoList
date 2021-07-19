import {TaskActionsType, tasksReducer} from '../features/TodolistList/tasks-reducer';
import {TodoListActionType, todoListsReducer} from '../features/TodolistList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {AppActionsType, appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reduser";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём state
export const store = createStore(rootReducer, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionType = TodoListActionType | TaskActionsType | AppActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionType>

// а это, чтобы можно было в консоли браузера обращаться к state в любой момент
// @ts-ignore
window.store = store;

