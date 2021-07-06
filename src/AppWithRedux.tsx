import React, {useCallback, useEffect} from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListThunk,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    fetchTodolistThunk,
    FilterValuesType,
    removeTodoListAC, removeTodoListThunk,
    TodolistDomainType, updateTodoListTitleThunk
} from "./state/todolists-reducer";
import {addTaskThunk, removeTaskThunk, updateTaskThunk} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStatuses, TasksType} from "./api/todolist-api";


// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {
    //BLL

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistThunk())
    }, [])


    const removeTask = useCallback((taskID: string, todoListID: string) => {

        dispatch(removeTaskThunk(taskID, todoListID))
    }, [])

    const addTask = useCallback((title: string, todoListID: string) => {

        dispatch(addTaskThunk(todoListID, title))
    }, [])

    const changeTaskStatus = useCallback((taskID: string, newStatus: TasksStatuses, todoListID: string) => {

        dispatch(updateTaskThunk(todoListID, taskID, newStatus))
    }, [])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {

        dispatch(updateTaskThunk(todoListID, taskID, undefined,  title))
    }, [])

    // todolist:
    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {

        dispatch(changeTodoListFilterAC(value, todoListID))
    }, [])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {

        dispatch(updateTodoListTitleThunk(todoListID, title))
    }, [])

    const removeTodoList = useCallback((todoListID: string) => {

        dispatch(removeTodoListThunk(todoListID))
    }, [])

    const addTodoList = useCallback((title: string) => {

        dispatch(addTodoListThunk(title))
    }, [])


    //UI


    console.log(tasks)
    const todoListComponents = todoLists.map(tl => {
        const allTodolistTask = tasks[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper elevation={7} style={{padding: '20px', borderRadius: '5px'}}>
                    <TodoList

                        todoListId={tl.id}
                        title={tl.title}
                        tasks={allTodolistTask}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />

                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
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
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>


            </Container>
        </div>
    )
}


export default AppWithRedux
