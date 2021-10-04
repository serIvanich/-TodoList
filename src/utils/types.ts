import {store} from '../app/store'
import {useDispatch} from "react-redux";
import { FieldErrorType } from '../api/types';
import {ThunkAction} from "redux-thunk";
import {rootReducer} from "../app/reducers";

//redux common types
export type RootReducerType = typeof rootReducer

export const useAppDispatch = () => useDispatch<AppDispatchType>()
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, any>