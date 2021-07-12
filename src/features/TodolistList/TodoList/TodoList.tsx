import React, {useCallback, useEffect} from 'react'

import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";

import {TasksStatuses, TasksType} from "../../../api/todolist-api";
import {FilterValuesType} from "../todolists-reducer";
import {fetchTasksThunk} from "../tasks-reducer";
import Task from "./Task/Task";
import {RequestStatusType} from "../../../app/app-reducer";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TasksType>
    filter: FilterValuesType
    entityStatus: RequestStatusType
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newStatus: TasksStatuses, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void

}

export const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {

    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TasksStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TasksStatuses.Completed);
    }

    const todo = useSelector<AppRootStateType>((state =>
        state.todoLists.filter(t => t.id === props.todoListId)[0]))

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksThunk(props.todoListId))
    }, [])
    const {filter} = props

    const tasks = tasksForTodolist.map(t => {


        return (
            <Task key={t.id} task={t} todoListId={props.todoListId}
                  changeTaskStatus={props.changeTaskStatus}
                  changeTaskTitle={props.changeTaskTitle}
                  removeTask={props.removeTask}
            />)
    })

    const onClickTodoList = useCallback(() => {
        props.removeTodoList(props.todoListId)

    }, [props.removeTodoList, props.todoListId])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }, [props.changeTodoListTitle, props.todoListId])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todoListId), [filter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todoListId), [filter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todoListId), [filter])


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickTodoList} disabled={props.entityStatus === 'loading'} style={{color: 'maroon'}}>
                    <DeleteOutlinedIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: "none", paddingLeft: '0px'}}>
                {tasks}
            </ul>
            <div>
                <Button

                    size={"small"}
                    variant={filter === 'all' ? "contained" : "outlined"}
                    color={'primary'}

                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={"small"}
                    variant={filter === 'active' ? "contained" : "outlined"}
                    color={'primary'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={"small"}
                    variant={filter === 'completed' ? "contained" : "outlined"}
                    color={'primary'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>

    )
})
