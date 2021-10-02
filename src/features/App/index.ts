import * as appSelectors from './selectors'
import {slice, asyncActions} from './app-reducer'
import {RequestStatusType as T1} from './app-reducer'

const appReducer = slice.reducer
const appActions = {
    ...asyncActions,
    ...slice.actions
}

export type RequestStatusType = T1

export {
    appSelectors,
    appReducer,
    appActions,

}

