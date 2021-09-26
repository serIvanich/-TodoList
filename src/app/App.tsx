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
import {AppRootStateType} from "./store";
import {asyncActions} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {authActions, authSelectors, Login} from "../features/auth";
import {Redirect, Route, Switch} from 'react-router-dom';
import {appSelectors} from "./index";


type PropsType = {
    demo?: boolean
}

//selector all


export const selectorTasks = (state: AppRootStateType) => state.tasks
export const selectorTodoLists = (state: AppRootStateType) => {
    return state.todoLists
}


const App: React.FC<PropsType> = ({demo = false}) => {

    const status = useSelector(appSelectors.selectorStatus)
    const isInitialized = useSelector(appSelectors.selectorInitialized)
    const isLoggedIn = useSelector(authSelectors.selectorLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!demo) {

            dispatch(asyncActions.initializeAppTC())
        }
    }, [])

    const logoutHandler = () => {
        dispatch(authActions.logoutTC())
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

