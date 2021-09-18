import {Dispatch} from "redux"
import {authApi, FieldErrorType, LoginRequestType} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reduser";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}

export const initializeAppTC = createAsyncThunk
('app/initializeApp', async (param, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const data = await authApi.me()
        if (data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))

            return

        } else {

            handleServerAppError(data, dispatch)
        }
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return
    } catch (e) {

        handleServerNetworkError(e.message, dispatch)
    }
})


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'succeeded',
        error: null,
        isInitialized: false
    } as AppInitialStateType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        // setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
        //     state.isInitialized = action.payload.value
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
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

export const {setAppStatusAC, setAppErrorAC} = slice.actions

// thunk

// export const initializeAppTC = () => async (dispatch: Dispatch) => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         const data = await authApi.me()
//         if (data.resultCode === 0) {
//
//             dispatch(setIsLoggedInAC({value: true}));
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         } else {
//
//             handleServerAppError(data, dispatch)
//         }
//         dispatch(setIsInitializedAC({value: true}))
//     } catch (e) {
//
//         handleServerNetworkError(e.message, dispatch)
//     }
// }
//

// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
// export type SetIsInitializedAC = ReturnType<typeof setIsInitializedAC>

// export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedAC

export const appReducer = slice.reducer
