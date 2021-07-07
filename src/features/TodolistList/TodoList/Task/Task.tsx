import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import {TasksStatuses, TasksType} from "../../../../api/todolist-api";

export type TaskPropsType = {
    task: TasksType
    todoListId: string
    changeTaskStatus: (taskID: string, newStatus: TasksStatuses, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    removeTask: (taskID: string, todoListId: string) => void

}


const Task: React.FC<TaskPropsType> = React.memo(({
                                                      task,
                                                      todoListId,
                                                      changeTaskStatus,
                                                      changeTaskTitle,
                                                      removeTask,

                                                  }) => {

    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked ? TasksStatuses.Completed : TasksStatuses.New
        changeTaskStatus(task.id, newStatus, todoListId)
    }, [task, todoListId])

    const onChangeTaskTitle = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todoListId)
    }, [task, todoListId])
    const onRemoveTask = useCallback(() => removeTask(task.id, todoListId), [task, todoListId])

    return (
        <li key={task.id}>
                <span className={task.status === TasksStatuses.Completed ? 'is-done' : ''}>
                    <Checkbox
                        color={"primary"}
                        checked={task.status === TasksStatuses.Completed}
                        onChange={onChangeTaskStatus}
                    />
                </span>
            <EditableSpan title={task.title} changeTitle={onChangeTaskTitle}/>
            <IconButton onClick={onRemoveTask} style={{color: 'maroon'}}>
                <DeleteOutlinedIcon/>
            </IconButton>

        </li>)

})

export default Task