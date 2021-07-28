import {Dispatch} from "redux"
import {authApi} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reduser";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export type AppInitialStateType = typeof initialState


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        }
    }
})

// export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//
//         case "APP/SET-IS-INITIALIZED":
//             return {...state, isInitialized: action.isInitialized}
//         default:
//             return state
//     }
// }
//
// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
// export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions

// thunk

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const data = await authApi.me()
        if (data.resultCode === 0) {
            dispatch(setIsInitializedAC({value: true}))
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {

            handleServerAppError(data, dispatch)
        }
    } catch (e) {

        handleServerNetworkError(e.message, dispatch)
    }
}


// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
// export type SetIsInitializedAC = ReturnType<typeof setIsInitializedAC>

// export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedAC

export default slice.reducer
