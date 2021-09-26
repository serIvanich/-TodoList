import * as authSelectors from './selectors'
import {Login} from "./Login";
import {asyncActions, slice} from "./auth-reduser";

const authActions = {
    ...asyncActions,
    ...slice.actions,
}
export {
    authSelectors,
    Login,
    authActions
}

