import React, {useReducer, useState} from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import {v1} from 'uuid'
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    todoListsReducer,
    RemoveTodoListAC,
    AddTodoListAC
} from "./state/todolists-reducer";
import {tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])


    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {

        dispatchToTasks(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {

        dispatchToTasks(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {

        dispatchToTasks(changeTaskTitleAC(taskID, newTitle, todoListID))
    }

    // todolist:
    function changeFilter(value: FilterValuesType, todoListID: string) {

        dispatchToTodoLists(ChangeTodoListFilterAC(value, todoListID))
    }

    function changeTodoListTitle(title: string, todoListID: string) {

        dispatchToTodoLists(ChangeTodoListTitleAC(title, todoListID))
    }

    function removeTodoList(todoListID: string) {

        const action = RemoveTodoListAC(todoListID)

        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }

    function addTodoList(title: string) {

        const action = AddTodoListAC(title)

        dispatchToTodoLists(action)
        dispatchToTasks(action)
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
    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={7} style={{padding: '20px', borderRadius: '5px'}}>
                    <TodoList

                        todolistID={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodoList(tl)}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />

                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>

                    </IconButton>
                    <Typography variant={'h5'}>
                        Todolists
                    </Typography>
                    <Button
                        color={'inherit'}
                        variant={"outlined"}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>


            </Container>
        </div>
    )
}


export default AppWithReducer
