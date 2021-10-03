import {authApi} from "../../api/todolist-api";
import {setIsLoggedIn} from "../auth/auth-reduser";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppInitialStateType, RequestStatusType} from "./types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {appActions} from "../common-action/App";



const initializeApp = createAsyncThunk
('application/initializeApp', async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const data = await authApi.me()
        debugger
        if (data.resultCode === 0) {
            debugger
            thunkAPI.dispatch(setIsLoggedIn({value: true}))
        } else {

           return handleAsyncServerAppError(data, thunkAPI)
        }
        thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return
    } catch (e) {

       return handleAsyncServerNetworkError(e.message, thunkAPI)
    }
})

export const asyncActions = {
    initializeApp: initializeApp
}

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'succeeded',
        error: null,
        isInitialized: false
    } as AppInitialStateType,
    reducers: {
        // setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
        //     state.status = action.payload.status
        // },
        // setAppError(state, action: PayloadAction<{ error: string | null }>) {
        //     state.error = action.payload.error
        // },
        // setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
        //     state.isInitialized = action.payload.value
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
        builder.addCase(appActions.setAppStatus, (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        })
        builder.addCase( appActions.setAppError,(state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
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

