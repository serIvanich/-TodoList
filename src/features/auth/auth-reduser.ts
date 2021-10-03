import {authApi} from "../../api/todolist-api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FieldErrorType, LoginRequestType} from "../../api/types";
import {appActions} from "../common-action/App";


const login = createAsyncThunk<undefined, LoginRequestType,
    { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const data = await authApi.login(param)
        if (data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(data, thunkAPI)
        }
    } catch (e) {
        return handleAsyncServerNetworkError(e, thunkAPI)

    }
})


const logout = createAsyncThunk
('auth/logout', async (param, thunkAPI) => {
    try {
        thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
        const data = await authApi.logout()
        if (data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(data, thunkAPI)
        }
    } catch (e) {
        return handleAsyncServerNetworkError(e, thunkAPI)
    }
})


export const asyncActions = {
    login: login,
    logout: logout,
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false
            })
    }
})

export const {setIsLoggedIn} = slice.actions


// export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//
//             const c = {...state, isLoggedIn: action.isLoggedIn}
//             return c
//         default:
//             return state
//     }
// }
// actions
// thunks
// export const logoutTC = () => async (dispatch: Dispatch) => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         const data = await authApi.logout()
//         if (data.resultCode === 0) {
//
//             dispatch(setIsLoggedInAC({value: false}))
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         } else {
//
//             handleServerAppError(data, dispatch)
//         }
//     } catch (e) {
//
//         handleServerNetworkError(e.message, dispatch)
//     }
// }

// export const loginTC_ = (payload: LoginRequestType) => async (dispatch: Dispatch) => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         const data = await authApi.login(payload)
//         if (data.resultCode === 0) {
//
//             dispatch(setIsLoggedInAC({value: true}))
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         } else {
//
//             handleServerAppError(data, dispatch)
//         }
//     } catch (e) {
//
//         handleServerNetworkError(e.message, dispatch)
//     }
// }


// types





