import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodo()
            .then(setState)
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'new Todo3'
            todolistApi.createTodo(title)

            .then(setState)
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = 'f3ac28b6-753f-43c9-8e88-61aeef4784cf'
        todolistApi.deleteTodo(todoId)
            .then(setState)
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '02ac7e03-a60b-4e4f-9b18-b6d8271df9ae'
        const title = 'update Todo'
        todolistApi.updateTodo(todoId, title)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


