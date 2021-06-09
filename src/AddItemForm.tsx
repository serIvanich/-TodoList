import React, {useState, KeyboardEvent, ChangeEvent} from 'react'
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError('Title is requeired')
        }

        setTitle('')
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
                    size={"small"}
                    variant={"outlined"}
                    error={!!error}
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddItem}
                    label={'title'}
                    helperText={error}

                />



                <IconButton onClick={onClickAddItem} color={"primary"}>

                    <AddBox/>
                </IconButton>

            </div>

        )
    }
)


