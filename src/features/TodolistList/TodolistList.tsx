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
import {addTaskThunk, removeTaskThunk, TasksStateType, updateTaskThunk} from "./tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TasksStatuses} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {TodoList} from './TodoList/TodoList';

export const TodolistList: React.FC = () => {

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

    const changeTaskStatus = useCallback((taskID: string, status: TasksStatuses, todoListID: string) => {

        dispatch(updateTaskThunk(todoListID, taskID, {status}))
    }, [])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {

        dispatch(updateTaskThunk(todoListID, taskID, {title}))
    }, [])

    // todolist:
    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {

        dispatch(changeTodoListFilterAC(value, todoListID))
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

                        todoListId={tl.id}
                        title={tl.title}
                        tasks={allTodolistTask}
                        filter={tl.filter}
                        entityStatus={tl.entityStatus}
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
    return <>
        <Grid container style={{padding: '20px 0'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todoListComponents}
        </Grid>

    </>


}



