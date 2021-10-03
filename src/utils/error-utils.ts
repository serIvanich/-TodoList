import {AxiosError} from "axios";
import {ResponseType} from "../api/types";
import {appActions} from "../features/common-action/App";

// generic function

export const handleAsyncServerAppError = <T>(data: ResponseType<T>,
                                             thunkAPI: ThunkAPIType,
                                             showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (err: AxiosError,
                                              thunkAPI: ThunkAPIType,
                                              showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppError({error: err.message ? err.message : 'Some error occurred'}))
    }

    thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
}


//original type
// BaseThunkAPI<S, E, O extends Dispatch = Dispatch, RejectedValue = undefined>

type ThunkAPIType = {
    dispatch: Function
    rejectWithValue: Function
}
