

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FieldErrorType = { field: string, error: string }

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorType>
    data: T
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
export type GetTasksResponseType = {
    items: Array<TasksType>

    totalCount: number

    error: string | null


}
export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TasksStatuses
    priority?: number
    startDate?: string
    deadline?: string
}

export type AuthMeType = {
    id: number
    email: string
    login: string


}

export type LoginRequestType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

