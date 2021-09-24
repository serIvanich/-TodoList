import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {todolistApi} from "../../api/todolist-api";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {changeTodoListEntityStatus} from "./todolists-reducer";

export const fetchTodolist = createAsyncThunk
('todoLists/fetchTodoList', async ({}, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const data = await todolistApi.getTodo()
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todoLists: data}

    } catch (e) {
        const error: AxiosError = e
        handleServerNetworkError(error.message, dispatch)
        return rejectWithValue({})
    }
})
export const removeTodoList = createAsyncThunk
('todoLists/removeTodoList', async (param: { todoListId: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        dispatch(changeTodoListEntityStatus({id: param.todoListId, entityStatus: 'loading'}))
        const data = await todolistApi.deleteTodo(param.todoListId)

        if (data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todoListId: param.todoListId}
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e.message, dispatch)
        return rejectWithValue(null)
    }
})
export const addTodoList = createAsyncThunk
('todoLists/addTodoList', async (title: string , {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const data = await todolistApi.createTodo(title)
        if (data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todoList: data.data.item}
        } else {
            if (data.messages.length) {
                dispatch(setAppErrorAC({error: data.messages[0]}))
            } else {
                dispatch(setAppErrorAC({error: 'Some error occurred'}))
            }
            dispatch(setAppStatusAC({status: 'failed'}))
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e.message, dispatch)
        return rejectWithValue(null)
    }
})
export const changeTodoListTitle = createAsyncThunk
('todoLists/updateTodoList', async (param: { todoListId: string, title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const data = await todolistApi.updateTodo(param.todoListId, param.title)
        if (data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todoListId: param.todoListId, title: param.title}
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e.message, dispatch)
        return rejectWithValue(null)
    }
})