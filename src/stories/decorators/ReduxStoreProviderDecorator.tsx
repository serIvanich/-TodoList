import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers} from "redux";
import {tasksReducer, todoListsReducer} from "../../features/TodolistList";
import {v1} from "uuid";
import thunk from "redux-thunk";
import {configureStore} from '@reduxjs/toolkit';
import {HashRouter} from "react-router-dom";
import {authReducer} from "../../features/auth";
import {appReducer} from "../../features/application";
import {TaskPriorities, TasksStatuses} from "../../api/types";
import {AppRootStateType, RootReducerType} from "../../utils/types";


const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'loading', addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: 'todolistId1',
                order: 0, addedDate: ''
            },
            {
                id: v1(), title: "JS", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: 'todolistId1',
                order: 0, addedDate: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: 'todolistId2',
                order: 0, addedDate: ''
            },
            {
                id: v1(), title: "React Book", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: 'todolistId2',
                order: 0, addedDate: ''
            }
        ]
    },
    app: {
        status: 'succeeded',
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState as AppRootStateType,
    // initialGlobalState as AppRootStateType,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

export const HashRouterDecorator = (storyFn: any) => (
    <HashRouter>
        {storyFn()}
    </HashRouter>
)
