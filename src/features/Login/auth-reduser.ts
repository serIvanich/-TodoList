import { Dispatch } from 'redux'
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authApi, LoginRequestType, tasksApi} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {addTaskAC} from "../TodolistList/tasks-reducer";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        }
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
export const loginTC = (payload: LoginRequestType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const data = await authApi.login(payload)
        if (data.resultCode === 0) {

            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {

            handleServerAppError(data, dispatch)
        }
    } catch (e) {

        handleServerNetworkError(e.message, dispatch)
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const data = await authApi.logout()
        if (data.resultCode === 0) {

            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {

            handleServerAppError(data, dispatch)
        }
    } catch (e) {

        handleServerNetworkError(e.message, dispatch)
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

export default slice.reducer


