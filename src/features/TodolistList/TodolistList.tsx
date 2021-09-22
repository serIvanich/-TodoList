import React, {useCallback, useEffect} from 'react'
import './../../app/App.css'

import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Grid, Paper} from "@material-ui/core";
import {
    changeTodoListFilterAC,
    FilterValuesType
} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TasksStatuses} from "../../api/todolist-api";
import {TodoList} from './TodoList/TodoList';
import {Redirect} from "react-router-dom";
import {selectorTasks, selectorTodoLists} from "../../app/App";
import {authSelectors} from "../auth";
import {useActions} from "../../app/store";
import { updateTaskThunk} from "./tasks-actions";
import {tasksActions, todoListActions} from "./index";

type PropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<PropsType> = ({demo = false}) => {

    const tasks = useSelector(selectorTasks)
    const todoLists = useSelector(selectorTodoLists)
    const isLoggedIn = useSelector(authSelectors.selectorLoggedIn)
    const {removeTask, updateTaskThunk, addTaskThunk} = useActions(tasksActions)
    const {fetchTodolistThunk, changeTodoListTitleThunk, removeTodoListThunk, addTodoListThunk} = useActions(todoListActions)

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        fetchTodolistThunk()
    }, [])


    const removeTaskCallback = useCallback((taskID: string, todolistId: string) => {
       removeTask({taskID, todolistId})
        // dispatch(removeTask({taskID, todolistId}))
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        addTaskThunk({todoListId, title})
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TasksStatuses, todoListId: string) => {
        updateTaskThunk({todoListId, taskId, model: {status}})
    }, [])

    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        updateTaskThunk({todoListId: todoListId, taskId: taskId, model: {title}})
    }, [])

    // todolist:
    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC({value, todoListId}))
    }, [])

    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {

        changeTodoListTitleThunk({todoListId, title})
    }, [])

    const removeTodoList = useCallback((todoListId: string) => {

       removeTodoListThunk({todoListId})
    }, [])

    const addTodoList = useCallback((title: string) => {

        addTodoListThunk({title})
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
        return <Redirect to={'/login'}/>
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



