import React, {useState, KeyboardEvent, ChangeEvent} from 'react'
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }

        setTitle('')
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddItem()
        }
    }
    // const errorMessage = error
    //     ? <div style={{color: 'red'}}>'text is required'</div>
    //     : null


    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                error={error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                label={'title'}
                helperText={error && 'title is required'}
                onBlur={() => setError(false)}
            />


            {/*<input className={error ? 'error' : ''}*/}
            {/*       value={title}*/}
            {/*       onChange={onChangeTitle}*/}
            {/*       onKeyPress={onKeyPressAddItem}/>*/}
            {/*<button onClick={onClickAddItem}>+</button>*/}
            <IconButton onClick={onClickAddItem} color={"primary"}>

                <AddBox/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>

    )
}


export default AddItemForm