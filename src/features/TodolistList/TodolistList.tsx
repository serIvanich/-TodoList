import React, {useCallback, useEffect} from 'react'
import './../../app/App.css'
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm/AddItemForm";
import {Grid, Paper} from "@material-ui/core";
import {useSelector} from "react-redux";
import {TodoList} from './TodoList/TodoList';
import {Redirect} from "react-router-dom";
import {todoListActions} from "./index";
import {useActions} from "../../utils/redux-utils";
import {AppRootStateType, useAppDispatch} from "../../utils/types";
import {TodolistDomainType} from "./todolists-reducer";
import {TasksStateType} from "./tasks-reducer";
import {selectorLoggedIn} from "../auth/selectors";

type PropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<PropsType> = ({demo = false}) => {

    const tasks = useSelector<AppRootStateType, TasksStateType>(
        (state) => state.tasks)
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
        (state) => {
            return state.todoLists
        })
    const isLoggedIn = useSelector(selectorLoggedIn)
    const {fetchTodolist} = useActions(todoListActions)
    const dispatch = useAppDispatch()

    const addTodolistCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        const resultAction = await dispatch(todoListActions.addTodoList(title))
        if (todoListActions.addTodoList.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload.errors[0]
                helper.setError(errorMessage)

            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
        }

    }, [])

    useEffect(() => {
        if (demo || !isLoggedIn) {

            return;
        }

        fetchTodolist()
    }, [])


    // todolist:


    const todoListComponents = todoLists.map(tl => {
        const allTodolistTask = tasks[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper elevation={7} style={{padding: '20px', borderRadius: '5px', width: '275px'}}>
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
        debugger
        return <Redirect to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px 0'}}>
            <AddItemForm addItem={addTodolistCallback}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
            {todoListComponents}
        </Grid>

    </>


}



