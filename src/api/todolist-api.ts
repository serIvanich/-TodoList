import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '4cdd576b-fe8e-4ab2-8ae3-522fa7c936ae',
    }
})

type TodolistType = {
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
       return  instance.get<Array<TodolistType>>('todo-lists')
            .then(res => res.data)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
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
