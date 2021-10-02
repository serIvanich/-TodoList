
import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';
import {AxiosError} from "axios";
import {appActions} from "../features/App";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType,
                                        showError = true) => {
    if (showError) {
        dispatch(appActions.setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatusAC({status: 'failed'}))
}
export const handleAsyncServerAppError = <T>(data: ResponseType<T>,
                                             thunkAPI: ThunkAPIType,
                                             showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType,
                                         showError = true) => {
    if (showError) {
        dispatch(appActions.setAppErrorAC({error}))
    }

    dispatch(appActions.setAppStatusAC({status: 'failed'}))
}

export const handleAsyncServerNetworkError = (err: AxiosError,
                                              thunkAPI: ThunkAPIType,
                                              showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppErrorAC({error: err.message ? err.message : 'Some error occurred'}))
    }

    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
}

type ErrorUtilsDispatchType = Dispatch

//original type
// BaseThunkAPI<S, E, O extends Dispatch = Dispatch, RejectedValue = undefined>

type ThunkAPIType = {
    dispatch: Function
    rejectWithValue: Function
}
