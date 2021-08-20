import {Dispatch} from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authApi, LoginRequestType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const loginTC = createAsyncThunk('auth/loading', async (param:LoginRequestType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {

        const data = await authApi.login(param)
        if (data.resultCode === 0) {

            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
           return {isLoggedIn: true}
        } else {

            handleServerAppError(data, thunkAPI.dispatch)
            return {isLoggedIn: false}
        }
    } catch (e) {

        handleServerNetworkError(e.message, thunkAPI.dispatch)
        return {isLoggedIn: false}
    }
})

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
        builder.addCase(loginTC.fulfilled,(state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
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


export const logoutTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const data = await authApi.logout()
        if (data.resultCode === 0) {

            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {

            handleServerAppError(data, dispatch)
        }
    } catch (e) {

        handleServerNetworkError(e.message, dispatch)
    }
}

// types


export default slice.reducer


