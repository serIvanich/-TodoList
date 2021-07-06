import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '4cdd576b-fe8e-4ab2-8ae3-522fa7c936ae',
    }
})

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T


}
export const todolistApi = {
    getTodo() {
        return instance.get<Array<TodolistType>>('todo-lists')
            .then(res => res.data)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
            .then(res => res.data)
    },
    deleteTodo(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
            .then(res => res.data)
    },
    updateTodo(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
    }
}

export enum TasksStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: TasksStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string

}
type GetTasksResponseType = {
    items: Array<TasksType>

    totalCount: number

    error: string | null


}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
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
    updateTask(todoId: string, taskId: string, payload: any) {
        return instance.put<ResponseType<TasksType>>(
            `/todo-lists/${todoId}/tasks/${taskId}`, {...payload})
            .then(res => res.data)
    }
}
