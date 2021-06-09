import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from 'react'
import {TextField} from "@material-ui/core";


type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)
    const onEditMode = useCallback(() => {
        setEditMode(true)
        // setTitle(props.title)
    },[])
    const offEditMode = useCallback(() => {
        setEditMode(false)
        props.changeTitle(title)
    },[])
    const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)


    },[])

    return (
        editMode

            ? <TextField

                color={"primary"}
                value={title}
                autoFocus
                onChange={onChangeTitle}
                onBlur={offEditMode}

            />

            // ? <input
            //     value={title}
            //     autoFocus
            //     onChange={onChangeTitle}
            //     onBlur={offEditMode}
            //
            // />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})