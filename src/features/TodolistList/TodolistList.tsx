import React, {useCallback, useEffect} from 'react'
import './../../app/App.css'

import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Grid, Paper} from "@material-ui/core";
import {
    addTodoListThunk,
    changeTodoListFilterAC,
    fetchTodolistThunk,
    FilterValuesType,
    removeTodoListThunk,
    TodolistDomainType,
    updateTodoListThunk
} from "./todolists-reducer";
import {addTaskThunk, removeTask, TasksStateType, updateTaskThunk} from "./tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TasksStatuses} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {TodoList} from './TodoList/TodoList';
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<PropsType> = ({demo = false}) => {

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state  => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(fetchTodolistThunk())
    }, [])


    const removeTaskCallback = useCallback((taskID: string, todolistId: string) => {

        dispatch(removeTask({taskID, todolistId}))
    }, [])

    const addTask = useCallback((title: string, todoListID: string) => {

        dispatch(addTaskThunk(todoListID, title))
    }, [])

    const changeTaskStatus = useCallback((taskID: string, status: TasksStatuses, todoListID: string) => {

        dispatch(updateTaskThunk(todoListID, taskID, {status}))
    }, [])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {

        dispatch(updateTaskThunk(todoListID, taskID, {title}))
    }, [])

    // todolist:
    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {

        dispatch(changeTodoListFilterAC({value, todoListID}))
    }, [])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {

        dispatch(updateTodoListThunk(todoListID, title))
    }, [])

    const removeTodoList = useCallback((todoListID: string) => {

        dispatch(removeTodoListThunk(todoListID))
    }, [])

    const addTodoList = useCallback((title: string) => {

        dispatch(addTodoListThunk(title))
    }, [])

    const todoListComponents = todoLists.map(tl => {
        const allTodolistTask = tasks[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper elevation={7} style={{padding: '20px', borderRadius: '5px'}}>
                    <TodoList
                        demo={demo}
                        todoList={tl}

                        tasks={allTodolistTask}


                        removeTask={removeTaskCallback}
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

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return <>
        <Grid container style={{padding: '20px 0'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todoListComponents}
        </Grid>

    </>


}



