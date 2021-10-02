import {tasksReducer, todoListsReducer} from '../features/TodolistList';
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {authReducer} from "../features/auth";
import {configureStore} from '@reduxjs/toolkit';
import {appReducer} from "../features/App";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,


})
// непосредственно создаём state
// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// а это, чтобы можно было в консоли браузера обращаться к state в любой момент
// @ts-ignore
window.store = store;



