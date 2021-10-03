import React, {useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistList} from "../features/TodolistList";
import {useDispatch, useSelector} from "react-redux";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Redirect, Route, Switch} from 'react-router-dom';
import {appActions, appSelectors} from "../features/application";
import {AppRootStateType} from "../utils/types";
import {authActions, authSelectors, Login} from "../features/auth";
import {useActions} from "../utils/redux-utils";


type PropsType = {
    demo?: boolean
}

//selector all





const App: React.FC<PropsType> = ({demo = false}) => {

    const status = useSelector(appSelectors.selectorStatus)
    const isInitialized = useSelector(appSelectors.selectorInitialized)
    const isLoggedIn = useSelector(authSelectors.selectorLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)


    useEffect(() => {
        if (!demo) {

            initializeApp()
        }
    }, [])

    const logoutHandler = () => {
        logout()
    }
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
// const error = useSelector((state: AppRootStateType): string | null => state.app.error)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>

                    </IconButton>
                    <Typography variant={'h5'}>
                        Todolists
                    </Typography>
                    {isLoggedIn && <Button
                        color={'inherit'}
                        variant={"outlined"}
                        onClick={logoutHandler}>
                        Logout
                    </Button>}
                </Toolbar>
                {status === "loading" && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1 style={{
                        'marginTop': '100px',
                        'textAlign': 'center',
                        'fontSize': '50px'
                    }}>404 page not
                        found</h1>}/>
                    <Redirect from={'*'} to={'/'}/>
                </Switch>
            </Container>
        </div>
    )
}

export default App

