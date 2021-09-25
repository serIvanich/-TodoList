import React, {useEffect} from 'react'
import './../../app/App.css'

import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Grid, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {TodoList} from './TodoList/TodoList';
import {Redirect} from "react-router-dom";
import {selectorTasks, selectorTodoLists} from "../../app/App";
import {authSelectors} from "../auth";
import {useActions} from "../../app/store";
import {todoListActions} from "./index";

type PropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<PropsType> = ({demo = false}) => {

    const tasks = useSelector(selectorTasks)
    const todoLists = useSelector(selectorTodoLists)
    const isLoggedIn = useSelector(authSelectors.selectorLoggedIn)
    const {fetchTodolist, addTodoList} = useActions(todoListActions)
    const dispatch = useDispatch()
    useEffect(() => {
        if (demo || !isLoggedIn) {
            debugger
            return;
        }
        debugger
         fetchTodolist()
    }, [])


    // todolist:


    const todoListComponents = todoLists.map(tl => {
        const allTodolistTask = tasks[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper elevation={7} style={{padding: '20px', borderRadius: '5px'}}>
                    <TodoList
                        demo={demo}
                        todoList={tl}
                        tasks={allTodolistTask}
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



