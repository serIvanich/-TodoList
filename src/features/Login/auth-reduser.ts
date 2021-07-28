import {Dispatch} from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authApi, LoginRequestType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
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
        dispatch(setAppStatusAC({status: 'loading'}))
        const data = await authApi.login(payload)
        if (data.resultCode === 0) {

            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {

            handleServerAppError(data, dispatch)
        }
    } catch (e) {

        handleServerNetworkError(e.message, dispatch)
    }
}
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


