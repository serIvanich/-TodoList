import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import {TasksStatuses, TasksType} from "../../../../api/todolist-api";

export type TaskPropsType = {
    task: TasksType
    todoId: string
    changeTaskStatus: (taskID: string, newStatus: TasksStatuses, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    removeTask: (param: { taskId: string, todolistId: string }) => void

}


const Task: React.FC<TaskPropsType> = React.memo(({
                                                      task,
                                                      todoId,
                                                      changeTaskStatus,
                                                      changeTaskTitle,
                                                      removeTask,

                                                  }) => {

    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked ? TasksStatuses.Completed : TasksStatuses.New
        changeTaskStatus(task.id, newStatus, todoId)
    }, [task, todoId])

    const onChangeTaskTitle = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todoId)
    }, [task, todoId])
    const onRemoveTask = useCallback(() => removeTask({taskId: task.id, todolistId: todoId}), [task, todoId])

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
            <IconButton onClick={onRemoveTask} style={{color: 'maroon'}} disabled={false}>
                <DeleteOutlinedIcon/>
            </IconButton>

        </li>)

})

export default Task