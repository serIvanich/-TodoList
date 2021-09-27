import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton, PropTypes} from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {useActions, useAppDispatch} from "../../../app/store";
import {FieldErrorType, TasksStatuses, TasksType} from "../../../api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import Task from "./Task/Task";
import {tasksActions, todoListActions} from "../index";


type TodoListPropsType = {
    todoList: TodolistDomainType
    tasks: Array<TasksType>
    demo?: boolean
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(({demo = false, ...props}) => {

    let tasksForTodolist = props.tasks
    if (props.todoList.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TasksStatuses.New)
    }
    if (props.todoList.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TasksStatuses.Completed);
    }
    const {changeTodoListFilter, removeTodoList, changeTodoListTitle} = useActions(todoListActions)
    const {addTask, fetchTasks} = useActions(tasksActions)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return;
        }
        fetchTasks({todoListId: props.todoList.id})
    }, [])


    const tasks = tasksForTodolist.map(t => {


        return (
            <Task key={t.id} task={t} todoId={props.todoList.id}
            />)
    })

    const onClickTodoList = useCallback(() => {
        removeTodoList({todoListId: props.todoList.id})

    }, [removeTodoList, props.todoList.id])


    const addTaskCallback = useCallback(async(title: string) => {
        let thunk = addTask({title, todoListId: props.todoList.id})
        const resultAction = await dispatch(thunk)
        if (addTask.rejected.match(resultAction)) {
            if (resultAction.payload?.fieldsErrors?.length) {
                const errorMessage = resultAction.payload.fieldsErrors[0]
                throw new Error(errorMessage.error)
            } else {
                throw new Error('Some error occured')
            }
        }

    }, [props.todoList.id])

    const changeTodoListTitleCallback = useCallback((title: string) => {
        changeTodoListTitle({title, todoListId: props.todoList.id})
    }, [changeTodoListTitle, props.todoList.id])

    const onFilterButtonClickHandler = useCallback((filter: FilterValuesType) =>
        changeTodoListFilter({value: filter, todoListId: props.todoList.id}), [props.todoList.filter])

    const renderFilterButton = (buttonFilter: FilterValuesType, color: PropTypes.Color, text: string) => {
        return <>
            <Button
                style={{marginLeft: '3px'}}
                size={"small"}
                variant={props.todoList.filter === buttonFilter ? "contained" : "outlined"}
                color={color}
                onClick={() => onFilterButtonClickHandler(buttonFilter)}>{text}
            </Button>
        </>
    }

    return (
        <div style={{position: 'relative'}}>
            <IconButton onClick={onClickTodoList} disabled={props.todoList.entityStatus === 'loading'}
                        style={{position: 'absolute', right: '-16px', top: '-6px', color: 'maroon'}}>
                <DeleteOutlinedIcon/>
            </IconButton>

            <h3 >
                <EditableSpan title={props.todoList.title} changeTitle={changeTodoListTitleCallback}/>
                </h3>
            <AddItemForm addItem={addTaskCallback} disabled={props.todoList.entityStatus === 'loading'}/>

            <ul style={{listStyle: "none", paddingLeft: '0px'}}>
                {tasks}
                {!tasks.length && <div style={{padding: '10px', color: 'grey'}}>No task</div>}
            </ul>
            <div>
                {renderFilterButton('all', 'primary', 'All')}
                {renderFilterButton('active', 'primary', 'Active')}
                {renderFilterButton('completed', 'primary', 'Completed')}
            </div>
        </div>

    )
})

// type FilterButtonPropsType = {
//     onClick: () => void
//     selectedFilter: FilterValuesType
//     buttonFilter: FilterValuesType
//     color: PropTypes.Color
// }

// const FilterButton: React.FC<FilterButtonPropsType> = (
//     {onClick, selectedFilter, buttonFilter, color}) => {
//     return <>
//         <Button
//             style={{marginLeft: '3px'}}
//             size={"small"}
//             variant={selectedFilter === buttonFilter ? "contained" : "outlined"}
//             color={color}
//             onClick={onClick}>Active
//         </Button>
//     </>
// }

//const onAllClickHandler = useCallback(() =>
//     changeTodoListFilter({value: 'all', todoListId: props.todoList.id}), [props.todoList.filter])
// const onActiveClickHandler = useCallback(() =>
//     changeTodoListFilter({value: 'active', todoListId: props.todoList.id}), [props.todoList.filter])
// const onCompletedClickHandler = useCallback(() =>
//     changeTodoListFilter({value: 'completed', todoListId: props.todoList.id}), [props.todoList.filter])

