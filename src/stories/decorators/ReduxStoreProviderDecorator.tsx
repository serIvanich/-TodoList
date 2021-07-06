import React from 'react'
import {Provider} from 'react-redux'
import {AppRootStateType, store} from '../../app/store'
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/TodolistList/tasks-reducer";
import {todoListsReducer} from "../../features/TodolistList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TasksStatuses} from "../../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: 'todolistId1',
                order: 0, addedDate: ''},
            {id: v1(), title: "JS", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: 'todolistId1',
                order: 0, addedDate: ''}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: 'todolistId2',
                order: 0, addedDate: ''},
            {id: v1(), title: "React Book", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: 'todolistId2',
                order: 0, addedDate: ''}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)


