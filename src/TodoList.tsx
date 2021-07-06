import React, {useCallback, useEffect} from 'react'

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Task} from "./Task";
import {TasksStatuses, TasksType} from "./api/todolist-api";
import {FilterValuesType} from "./state/todolists-reducer";
import {fetchTasksThunk} from "./state/tasks-reducer";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TasksType>
    filter: FilterValuesType
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
    //
    // const tasks1 = useSelector<AppRootStateType>(state => state.tasks[0])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksThunk(props.todoListId))
    }, [])
    const {filter} = props
    // const [title, setTitle] = useState<string>('')
    // const [error, setError] = useState<boolean>(false)
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
                {/*<button onClick={onClickTodoList}>x</button>*/}
                <IconButton onClick={onClickTodoList} style={{color: 'maroon'}}>
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
                    // className={filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={"small"}
                    variant={filter === 'completed' ? "contained" : "outlined"}
                    color={'primary'}
                    // className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>

    )
})
