import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormSubmitHelperType = {
    setError: (error: string) => void,
    setTitle: (title: string) => void
}

export type AddItemFormPropsType = {
    addItem: (title: string,
              helper: AddItemFormSubmitHelperType) => Promise<void>
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItemHandler = async () => {
        if (title.trim() !== '') {
            addItem(title, {setError, setTitle})
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {

        if (error !== null) {
            setError(null)
        }

        if (e.key === 'Enter') {
            addItemHandler()
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


                <IconButton onClick={addItemHandler} color={"primary"} disabled={disabled}>

                    <AddBox/>
                </IconButton>

            </div>

        )
    }
)


