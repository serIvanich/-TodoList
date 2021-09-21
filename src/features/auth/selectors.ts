import {AppRootStateType} from "../../app/store";


export const selectorLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
