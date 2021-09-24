import React, {useCallback, useEffect} from 'react'

import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useActions} from "../../../app/store";

import {TasksStatuses, TasksType} from "../../../api/todolist-api";
import {TodolistDomainType} from "../todolists-reducer";
import Task from "./Task/Task";
import {fetchTasks} from "../tasks-actions";
import {tasksActions, todoListActions} from "../index";


type TodoListPropsType = {
    todoList: TodolistDomainType
    tasks: Array<TasksType>
    demo?: boolean
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(({demo = false, ...props}) => {

    let tasksForTodolist = props.tasks
    if (props.todoList.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TasksStatuses.New)
    }
    if (props.todoList.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TasksStatuses.Completed);
    }
    const {changeTodoListFilter, removeTodoList, changeTodoListTitle} = useActions(todoListActions)
    const {addTask, updateTask, removeTask} = useActions(tasksActions)

    const todo = useSelector<AppRootStateType>((state =>
        state.todoLists.filter(t => t.id === props.todoList.id)[0]))

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTasks({todoListId: props.todoList.id}))
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TasksStatuses, todoListId: string) => {
        updateTask({todoListId, taskId, model: {status}})
    }, [])

    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        updateTask({todoListId: todoListId, taskId: taskId, model: {title}})
    }, [])

    const tasks = tasksForTodolist.map(t => {


        return (
            <Task key={t.id} task={t} todoId={props.todoList.id}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                  removeTask={removeTask}
            />)
    })

    const onClickTodoList = useCallback(() => {
        removeTodoList({todoListId: props.todoList.id})

    }, [removeTodoList, props.todoList.id])


    const addTaskCallback = useCallback((title: string) => {
        addTask({title, todoListId: props.todoList.id})
    }, [props.todoList.id])

    const changeTodoListTitleCallback = useCallback((title: string) => {
        changeTodoListTitle({title, todoListId: props.todoList.id})
    }, [changeTodoListTitle, props.todoList.id])

    const onAllClickHandler = useCallback(() =>
        changeTodoListFilter({value: 'all', todoListId: props.todoList.id}), [props.todoList.filter])
    const onActiveClickHandler = useCallback(() =>
        changeTodoListFilter({value: 'active', todoListId: props.todoList.id}), [props.todoList.filter])
    const onCompletedClickHandler = useCallback(() =>
        changeTodoListFilter({value: 'completed', todoListId: props.todoList.id}), [props.todoList.filter])


    return (
        <div>
            <h3>
                <EditableSpan title={props.todoList.title} changeTitle={changeTodoListTitleCallback}/>
                <IconButton onClick={onClickTodoList} disabled={props.todoList.entityStatus === 'loading'}
                            style={{color: 'maroon'}}>
                    <DeleteOutlinedIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled={props.todoList.entityStatus === 'loading'}/>

            <ul style={{listStyle: "none", paddingLeft: '0px'}}>
                {tasks}
            </ul>
            <div>
                <Button

                    size={"small"}
                    variant={props.todoList.filter === 'all' ? "contained" : "outlined"}
                    color={'primary'}

                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={"small"}
                    variant={props.todoList.filter === 'active' ? "contained" : "outlined"}
                    color={'primary'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={"small"}
                    variant={props.todoList.filter === 'completed' ? "contained" : "outlined"}
                    color={'primary'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>

    )
})
