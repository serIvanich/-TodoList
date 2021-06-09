import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import {TaskType} from "../AppWithRedux";

type TaskPropsType = {
    task: TaskType
    todolistID: string
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void

}


export const Task: React.FC<TaskPropsType> = React.memo(({
                                    task,
                                    todolistID,
                                    changeTaskStatus,
    changeTaskTitle,
    removeTask,

}) => {

    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue, todolistID)
    },[])
    const onChangeTaskTitle = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todolistID)
    },[])
    const onRemoveTask = useCallback(() => removeTask(task.id, todolistID),[])

    return (
        <li key={task.id}>
                <span className={task.isDone ? 'is-done' : ''}>
                    <Checkbox
                        color={"primary"}
                        checked={task.isDone}
                        onChange={onChangeTaskStatus}
                    />
                </span>

            {/*<input*/}
            {/*    onChange={changeTaskStatus}*/}
            {/*    type='checkbox'*/}
            {/*    checked={t.isDone}/>*/}
            {/*/!*<span>{t.title}</span>*!/*/}
            <EditableSpan title={task.title} changeTitle={onChangeTaskTitle}/>
            {/*<button onClick={removeTask}>x</button>*/}
            <IconButton onClick={onRemoveTask} style={{color: 'maroon'}}>
                <DeleteOutlinedIcon/>
            </IconButton>

        </li>)

})