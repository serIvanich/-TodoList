import * as authSelectors from './selectors'
import {Login} from "./Login";
import {asyncActions, slice} from "./auth-reduser";

const authActions = {
    ...asyncActions,
    slice
}
export {
    authSelectors,
    Login,
    authActions
}

