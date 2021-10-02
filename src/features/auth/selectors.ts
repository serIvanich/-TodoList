import { AppRootStateType } from "../../utils/types";



export const selectorLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
