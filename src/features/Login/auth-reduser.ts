import {setAppStatusAC} from '../../app/app-reducer'
import {authApi, FieldErrorType, LoginRequestType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export const loginTC = createAsyncThunk<undefined, LoginRequestType,
    { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {

        const data = await authApi.login(param)
        if (data.resultCode === 0) {

            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {

            handleServerAppError(data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
        }
    } catch (e) {
        const error: AxiosError = e
        handleServerNetworkError(error.message, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})


export const logoutTC = createAsyncThunk
('auth/logout', async (param, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const data = await authApi.logout()
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {

            handleServerAppError(data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (e) {

        handleServerNetworkError(e.message, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

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


const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

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

export const {setIsLoggedInAC} = slice.actions

// thunks


// types


export default slice.reducer


