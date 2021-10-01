import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import {TasksStatuses, TasksType} from "../../../../api/todolist-api";
import {useActions} from "../../../../app/store";
import {tasksActions} from "../../index";

export type TaskPropsType = {
    task: TasksType
    todoId: string
}


const Task: React.FC<TaskPropsType> = React.memo(({task, todoId}) => {

    const {updateTask, removeTask} = useActions(tasksActions)


    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({todoListId: todoId, taskId: task.id,
            model: {status: e.currentTarget.checked ? TasksStatuses.Completed : TasksStatuses.New}})
    }, [task, todoId])

    const onChangeTaskTitle = useCallback((newTitle: string) => {
        updateTask({todoListId: todoId, taskId: task.id, model: {title: newTitle}})
    }, [task, todoId])
    const onRemoveTask = useCallback(() => removeTask({taskId: task.id, todoListId: todoId}),
        [task])

    return (
        <li key={task.id} style={{position: 'relative'}}>
                <span className={task.status === TasksStatuses.Completed ? 'is-done' : ''} >
                    <Checkbox
                        color={"primary"}
                        checked={task.status === TasksStatuses.Completed}
                        onChange={onChangeTaskStatus}
                    />
                </span>
            <EditableSpan title={task.title} changeTitle={onChangeTaskTitle}/>
            <IconButton onClick={onRemoveTask} style={{position: 'absolute', top: '-2px', right: '-12px', color: 'maroon'}} disabled={false}>
                <DeleteOutlinedIcon fontSize={'small'}/>
            </IconButton>

        </li>)

})

export default Task


// const changeTaskStatus = useCallback((taskId: string, status: TasksStatuses, todoListId: string) => {
//
// }, [])
//
// const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
//     updateTask({todoListId: todoListId, taskId: taskId, model: {title}})
// }, [])
