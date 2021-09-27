import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickAddItem = async () => {
        if (title.trim() !== '') {
            try {
                await addItem(title)
                setTitle('')
            } catch (e) {
                setError(e.message)
            }
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.key === 'Enter') {
            onClickAddItem()
        }
    }

        return (
            <div>
                <TextField
                    disabled={disabled}
                    size={"small"}
                    variant={"outlined"}
                    error={!!error}
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddItem}
                    label={'title'}
                    helperText={error}

                />


                <IconButton onClick={onClickAddItem} color={"primary"} disabled={disabled}>

                    <AddBox/>
                </IconButton>

            </div>

        )
    }
)


