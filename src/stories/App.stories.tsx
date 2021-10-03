import React from 'react'
import App from "../app/App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'application Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}
export const AppBaseExample = (props: {demo: boolean}) => {
    return (<App demo={true}/>)
}
