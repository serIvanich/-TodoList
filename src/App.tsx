import React, {useState} from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import {v1} from 'uuid'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all'|'active'|'completed'

function App() {

    //BLL
    const [tasks, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'JavaScript', isDone: true},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('active')



    function removeTask(taskID: string) {
        const newTasks = tasks.filter(t => t.id !== taskID)
        console.log(tasks)
        setTask(newTasks)
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTask([newTask, ...tasks])
    }
    function changeTaskStatus(taskID: string, newIsDoneValue: boolean){
        setTask(tasks.map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t))
    }

    function changeFilter(value: FilterValuesType){
        setFilter(value)

    }

    //UI

    function  getTasksForTodoList() {


        switch (filter){


            case 'active':
                return tasks.filter( t => !t.isDone)

            case 'completed':
                return tasks.filter( t => t.isDone===true)
            default:
                return tasks


        }
    }

    console.log(tasks)
    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={getTasksForTodoList()}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />

        </div>
    )
}


export default App
