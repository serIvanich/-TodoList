import React, {useReducer, useState} from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import {v1} from 'uuid'
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    todoListsReducer,
    RemoveTodoListAC,
    AddTodoListAC
} from "./state/todolists-reducer";
import {tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    //BLL

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    const dispatch = useDispatch()


    const [filter, setFilter] = useState<FilterValuesType>('active')


    function removeTask(taskID: string, todoListID: string) {

        dispatch(removeTaskAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {

        dispatch(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {

        dispatch(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {

        dispatch(changeTaskTitleAC(taskID, newTitle, todoListID))
    }

    // todolist:
    function changeFilter(value: FilterValuesType, todoListID: string) {

        dispatch(ChangeTodoListFilterAC(value, todoListID))
    }

    function changeTodoListTitle(title: string, todoListID: string) {

        dispatch(ChangeTodoListTitleAC(title, todoListID))
    }

    function removeTodoList(todoListID: string) {

        dispatch(RemoveTodoListAC(todoListID))
    }

    function addTodoList(title: string) {




        dispatch(AddTodoListAC(title))
    }


    //UI

    function getTasksForTodoList(todoList: TodoListType) {


        switch (todoList.filter) {


            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone)

            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]


        }
    }

    console.log(tasks)
    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={7} style={{padding: '20px', borderRadius: '5px'}}>
                    <TodoList

                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodoList(tl)}
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
