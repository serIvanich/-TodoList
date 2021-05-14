import React, {ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from './App'
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';


type TodoListPropsType = {
    todoListID: string
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

export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const {filter} = props
    // const [title, setTitle] = useState<string>('')
    // const [error, setError] = useState<boolean>(false)
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        }
        const changeTaskTitle = (newTitle: string)=> {
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        }


        return (
            <li  key={t.id}>
                <span className={t.isDone ? 'is-done' : ''}>
                    <Checkbox
                        color={"primary"}
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                </span>

                {/*<input*/}
                {/*    onChange={changeTaskStatus}*/}
                {/*    type='checkbox'*/}
                {/*    checked={t.isDone}/>*/}
                {/*/!*<span>{t.title}</span>*!/*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                {/*<button onClick={removeTask}>x</button>*/}
                <IconButton onClick={removeTask} style={{color: 'maroon'}}>
                    <DeleteOutlinedIcon />
                </IconButton>

            </li>)
    })

    const onClickTodoList = () => props.removeTodoList(props.todoListID)


    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)


    // @ts-ignore
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                {/*<button onClick={onClickTodoList}>x</button>*/}
                <IconButton onClick={onClickTodoList} style={{color: 'maroon'}}>
                    <DeleteOutlinedIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle:"none", paddingLeft: '0px'}}>
                {tasks}
            </ul>
            <div>
                <Button

                    size={"small"}
                    variant={filter === 'all' ? "contained" : "outlined"}
                    color={'primary'}

                        onClick={() => props.changeFilter('all', props.todoListID)}>All
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={"small"}
                    variant={filter === 'active' ? "contained" : "outlined"}
                    color={'primary'}
                    // className={filter === 'active' ? 'active-filter' : ''}
                        onClick={() => props.changeFilter('active', props.todoListID)}>Active
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={"small"}
                    variant={filter === 'completed' ? "contained" : "outlined"}
                    color={'primary'}
                    // className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => props.changeFilter('completed', props.todoListID)}>Completed
                </Button>
            </div>
        </div>

    )
}
