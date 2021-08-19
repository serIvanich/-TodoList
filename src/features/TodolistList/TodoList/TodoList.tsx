import React, {useCallback, useEffect} from 'react'

import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";

import {TasksStatuses, TasksType} from "../../../api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {fetchTasks} from "../tasks-reducer";
import Task from "./Task/Task";
import {RequestStatusType} from "../../../app/app-reducer";


type TodoListPropsType = {
    todoList: TodolistDomainType

    tasks: Array<TasksType>

    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newStatus: TasksStatuses, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
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

    const todo = useSelector<AppRootStateType>((state =>
        state.todoLists.filter(t => t.id === props.todoList.id)[0]))

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTasks(props.todoList.id))
    }, [])


    const tasks = tasksForTodolist.map(t => {


        return (
            <Task key={t.id} task={t} todoListId={props.todoList.id}
                  changeTaskStatus={props.changeTaskStatus}
                  changeTaskTitle={props.changeTaskTitle}
                  removeTask={props.removeTask}
            />)
    })

    const onClickTodoList = useCallback(() => {
        props.removeTodoList(props.todoList.id)

    }, [props.removeTodoList, props.todoList.id])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoList.id)
    }, [props.addTask, props.todoList.id])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoList.id)
    }, [props.changeTodoListTitle, props.todoList.id])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todoList.id), [props.todoList.filter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todoList.id), [props.todoList.filter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todoList.id), [props.todoList.filter])


    return (
        <div>
            <h3>
                <EditableSpan title={props.todoList.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickTodoList} disabled={props.todoList.entityStatus === 'loading'}
                            style={{color: 'maroon'}}>
                    <DeleteOutlinedIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todoList.entityStatus === 'loading'}/>

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
