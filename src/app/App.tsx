import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistList} from "../features/TodolistList/TodolistList";
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import {connect, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

type PropsType = {
    demo?: boolean
}

const App: React.FC<PropsType> = ({demo = false}) => {
    const status = useSelector((state: AppRootStateType): RequestStatusType => state.app.status)
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
                    <Button
                        color={'inherit'}
                        variant={"outlined"}>
                        Login
                    </Button>
                </Toolbar>
                {status === "loading" && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <TodolistList demo={demo}/>
            </Container>
        </div>
    )
}

export default App
