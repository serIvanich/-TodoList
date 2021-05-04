import React, {useState, KeyboardEvent, ChangeEvent} from 'react'


type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)
    const onEditMode = () => {
        setEditMode(true)
        // setTitle(props.title)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)


    }

    return (
        editMode

            ? <input
                value={title}
                autoFocus
                onChange={onChangeTitle}
                onBlur={offEditMode}

            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}