import React, {useState} from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import {v1} from 'uuid'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])


    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'JavaScript', isDone: true},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
        ],
    })

    const [filter, setFilter] = useState<FilterValuesType>('active')


    function removeTask(taskID: string, todoListID: string) {
        // tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        // setTasks({...tasks})
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID) })
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        // tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        setTasks({...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        })
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))

    }

    function removeTodoList(todoListID: string) {
        setTodoList(todoList.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }


    //UI

    function getTasksForTodoList(todoList: TodoListType) {


        switch (todoList.filter) {


            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone)

            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]


        }
    }

    console.log(tasks)
    const todoListComponents = todoList.map(tl => {
        return (
            <TodoList
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}
                tasks={getTasksForTodoList(tl)}
                filter={tl.filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />

        )
    })
    return (
        <div className="App">
            {todoListComponents}
        </div>
    )
}


export default App
