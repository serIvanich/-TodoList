// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {combineReducers} from "redux";
import {appReducer} from "../features/application";
import {authReducer} from "../features/auth";
import {tasksReducer, todoListsReducer} from "../features/TodolistList";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})