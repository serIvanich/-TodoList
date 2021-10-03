import {AppRootStateType} from "../../utils/types";


export const selectorStatus = (state: AppRootStateType) => state.app.status
export const selectorInitialized = (state: AppRootStateType) => state.app.isInitialized
