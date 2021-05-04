import React, {useState, KeyboardEvent, ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from './App'
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
            <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                <input
                    onChange={changeTaskStatus}
                    type='checkbox'
                    checked={t.isDone}/>
                {/*<span>{t.title}</span>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>)
    })
    // const onClickAddTask = () => {
    //     const trimmerTitle = title.trim()
    //     if (trimmerTitle) {
    //         props.addTask(title, props.todoListID)
    //     } else {
    //         setError(true)
    //     }
    //
    //     setTitle('')
    // }
    // const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         onClickAddTask()
    //     }
    // }
    const onClickTodoList = () => props.removeTodoList(props.todoListID)
    //   const errorMessage = error ? <div style={{color: 'red'}}>'text is required'</div> : null
    //    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //        setTitle(e.currentTarget.value)
    //        setError(false)
    //
    //    }

    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={onClickTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>*/}
            {/*    <input className={error ? 'error' : ''}*/}
            {/*           value={title}*/}
            {/*           onChange={onChangeTitle}*/}
            {/*           onKeyPress={onKeyPressAddTask}/>*/}
            {/*    <button onClick={onClickAddTask}>+</button>*/}
            {/*    {errorMessage}*/}
            {/*</div>*/}
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={() => props.changeFilter('all', props.todoListID)}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={() => props.changeFilter('active', props.todoListID)}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => props.changeFilter('completed', props.todoListID)}>Completed
                </button>
            </div>
        </div>

    )
}
