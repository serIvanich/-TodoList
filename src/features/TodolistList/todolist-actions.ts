import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {todolistApi} from "../../api/todolist-api";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {changeTodoListEntityStatusAC} from "./todolists-reducer";

export const fetchTodolistThunk = createAsyncThunk
('todoLists/fetchTodoList', async (param, {dispatch, rejectWithValue}) => {
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
export const removeTodoListThunk = createAsyncThunk
('todoLists/removeTodoList', async (param: { todoListId: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        dispatch(changeTodoListEntityStatusAC({id: param.todoListId, entityStatus: 'loading'}))
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
export const addTodoListThunk = createAsyncThunk
('todoLists/addTodoList', async (param: { title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const data = await todolistApi.createTodo(param.title)
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
export const changeTodoListTitleThunk = createAsyncThunk
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