import {TaskActionsType, tasksReducer} from '../features/TodolistList/tasks-reducer';
import {todoListsReducer} from '../features/TodolistList/todolists-reducer';
import {combineReducers} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import appReducer from "./app-reducer";
import authReducer from "../features/Login/auth-reduser";
import {configureStore} from '@reduxjs/toolkit';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём state
// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

// определить автоматически тип всего объекта состояния

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionType =  TaskActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, any>

// а это, чтобы можно было в консоли браузера обращаться к state в любой момент
// @ts-ignore
window.store = store;

