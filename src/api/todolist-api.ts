import axios from "axios"
import {
    AuthMeType,
    GetTasksResponseType,
    LoginRequestType,
    ResponseType,
    TasksType,
    TodolistType,
    UpdateTaskModelType
} from "./types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '4cdd576b-fe8e-4ab2-8ae3-522fa7c936ae',
    }
})


export const todolistApi = {
    getTodo() {
        return instance.get<Array<TodolistType>>('todo-lists')
            .then(res => res.data)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
            .then(res => res.data)
    },
    deleteTodo(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
            .then(res => res.data)
    },
    updateTodo(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title})
            .then(res => res.data)
    }
}




export const tasksApi = {
    getTasks(todoId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todoId}/tasks`)
            .then(res => res.data)
    },
    createTask(todoId: string, title: string) {
        return instance.post<ResponseType<{ item: TasksType }>>(`/todo-lists/${todoId}/tasks`, {title})
            .then(res => res.data)
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    updateTask(todoId: string, taskId: string, payload: UpdateTaskModelType) {
        return instance.put<ResponseType<TasksType>>(
            `/todo-lists/${todoId}/tasks/${taskId}`, {...payload})
            .then(res => res.data)
    }
}


export const authApi = {
    me() {
        return instance.get<ResponseType<AuthMeType>>('/auth/me').then(res => res.data)
    },

    login(data: LoginRequestType) {
        return instance.post<ResponseType<{ userId: number }>>(
            '/auth/login', data)
            .then(res => res.data)
    },

    logout() {
        return instance.delete<ResponseType>('/auth/login').then(res => res.data)
    }
}

