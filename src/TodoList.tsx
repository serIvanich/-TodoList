import React, {useCallback} from 'react'
import {FilterValuesType, TaskType} from './App'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Task} from "./Task";


type TodoListPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void

}

export const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {

    let tasksForTodolist = props.tasks


    if (props.filter === 'active') {
        tasksForTodolist.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    const todo = useSelector<AppRootStateType>((state =>
        state.todolists.filter(t => t.id === props.todolistID)[0]))

    const tasks1 = useSelector<AppRootStateType>(state => state.tasks[0])

    const dispatch = useDispatch()

    const {filter} = props
    // const [title, setTitle] = useState<string>('')
    // const [error, setError] = useState<boolean>(false)
    const tasks = props.tasks.map(t => {


        return (
            <Task key={t.id} task={t} todolistID={props.todolistID}
                  changeTaskStatus={props.changeTaskStatus}
                  changeTaskTitle={props.changeTaskTitle}
                  removeTask={props.removeTask}
            />)
    })

    const onClickTodoList = useCallback(() => {
        props.removeTodoList(props.todolistID)
    }, [props.removeTodoList, props.todolistID])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistID)
    }, [props.addTask, props.todolistID])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todolistID)
    }, [props.changeTodoListTitle, props.todolistID])


    // @ts-ignore
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

                    onClick={() => props.changeFilter('all', props.todolistID)}>All
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={"small"}
                    variant={filter === 'active' ? "contained" : "outlined"}
                    color={'primary'}
                    // className={filter === 'active' ? 'active-filter' : ''}
                    onClick={() => props.changeFilter('active', props.todolistID)}>Active
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={"small"}
                    variant={filter === 'completed' ? "contained" : "outlined"}
                    color={'primary'}
                    // className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => props.changeFilter('completed', props.todolistID)}>Completed
                </Button>
            </div>
        </div>

    )
})
