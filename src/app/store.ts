import {tasksReducer} from '../features/TodolistList';
import {todoListsReducer} from '../features/TodolistList';
import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/auth";
import {configureStore} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {useMemo} from "react";
import {FieldErrorType} from "../api/todolist-api";

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

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, any>
type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
// а это, чтобы можно было в консоли браузера обращаться к state в любой момент
// @ts-ignore
window.store = store;

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}

export type ThunkError = {rejectValue: {errors: Array<string>, fieldsErrors?: Array<FieldErrorType>}}
