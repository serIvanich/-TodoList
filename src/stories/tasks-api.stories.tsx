import React, {useEffect, useState} from 'react'
import {tasksApi, todolistApi} from "../api/todolist-api";

export default {
    title: 'API/Tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const getTasks = () => {
        tasksApi.getTasks(todolistId)
            .then(data => setState(data))
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const createTask = () => {

        tasksApi.createTask(todolistId, taskTitle)

            .then(setState)
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'Task Title'} value={taskTitle}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const deleteTask = () => {

        tasksApi.deleteTask(todolistId, taskId)
            .then(setState)
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <button onClick={deleteTask}>delete Task</button>
    </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('title 1')
    const [description, setDescription] = useState('description 1')
    const [status, setStatus] = useState(0)
    const [priority, setPriority] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [deadline, setDeadline] = useState('')
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const payload = {
        title: title,
        description: description,
    }
    const updateTask = () => {

        tasksApi.updateTask(todolistId, taskId, payload)
            .then(res => setState(res.data))
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId}
               onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <input placeholder={'task title'} value={title}
               onChange={(e) => setTitle(e.currentTarget.value)}/>
        <input placeholder={'Description'} value={description}
               onChange={(e) => setDescription(e.currentTarget.value)}/>
       <input placeholder={'status'} value={status}
               onChange={(e) => setStatus(+e.currentTarget.value)}/>

        <button onClick={updateTask}>update Task</button>

    </div>
    </div>
}


