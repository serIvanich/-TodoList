import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {tasksApi} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppRootStateType} from "../../app/store";
import {UpdateDomainTaskModelType} from "./tasks-reducer";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks',
    async (param: { todoListId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {

            const data = await tasksApi.getTasks(param.todoListId)
            const tasks = data.items
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todoListId: param.todoListId, tasks}
        } catch (e) {
            handleServerNetworkError(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })
export const removeTask = createAsyncThunk('tasks/removeTask',
    async (param: { taskId: string, todolistId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await tasksApi.deleteTask(param.todolistId, param.taskId)
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return param
        } catch (e) {
            handleServerNetworkError(e.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }

    })
export const addTask = createAsyncThunk('tasks/addTask',
    async (param: { title: string, todoListId: string}, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const data = await tasksApi.createTask(param.todoListId, param.title)
            if (data.resultCode === 0) {
                // const task = data.data.item
                // dispatch(addTaskAC(task))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return data.data.item
            } else {
                handleServerAppError(data, dispatch)
                return rejectWithValue({})
            }
        } catch (e) {
            handleServerNetworkError(e.message, dispatch)
            return rejectWithValue({})
        }
    })
export const updateTask = createAsyncThunk('tasks/updateTask',
    async (param: { todoListId: string, taskId: string, model: UpdateDomainTaskModelType }, {
        getState,
        dispatch,
        rejectWithValue
    }) => {
        const state = getState() as AppRootStateType
        const task = state.tasks[param.todoListId].find((t) => t.id === param.taskId)

        if (!task) {

            return rejectWithValue('task not found in the state')
        }
        const domainModel: UpdateDomainTaskModelType = {
            title: task.title,
            status: task.status,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            ...param.model
        }
        try {
            const data = await tasksApi.updateTask(param.todoListId, param.taskId, domainModel)
            if (data.resultCode === 0) {

                return param
            } else {
                handleServerAppError(data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e.message, dispatch)
            return rejectWithValue(null)
        }
    })