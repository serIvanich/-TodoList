import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType,
                                    showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred' }))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType,
                                         showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error}))
    }

    dispatch(setAppStatusAC({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch

