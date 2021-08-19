import React, {useEffect} from 'react'
import './App.css'
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistList} from "../features/TodolistList/TodolistList";
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Redirect, Route, Switch} from 'react-router-dom';
import {logoutTC} from "../features/Login/auth-reduser";

type PropsType = {
    demo?: boolean
}

const App: React.FC<PropsType> = ({demo = false}) => {
    const status = useSelector((state: AppRootStateType): RequestStatusType => state.app.status)
    const isInitialized = useSelector((state: AppRootStateType): boolean => state.app.isInitialized)
    const isLoggedIn = useSelector((state: AppRootStateType): boolean => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(initializeAppTC())
        }
    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress />
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
                         <Redirect from={'*'} to={'/'} />
                    </Switch>
                </Container>
            </div>
    )
}

export default App

