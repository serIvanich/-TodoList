import {TodoListType, FilterValuesType} from "../App";
import {ActionUnionType, AddTodoListAC, RemoveTodoListAC, todoListsReducer, ChangeTodoListTitleAC, ChangeTodoListFilterAC} from "./todolists-reducer";
import {v1} from "uuid"

let todoListID_1: string
let todoListID_2: string


let startState: Array<TodoListType>

beforeEach(() => {
    todoListID_1 = v1()
    todoListID_2 = v1()
    startState = [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist shold be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListID_1) )

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID_2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";


    // const action: ActionUnionType = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     todoListID: todolistId2,
    //     title: newTodolistTitle
    //
    // };
    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(newTodolistTitle, todoListID_2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";


    // const action: ActionUnionType = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     todoListID: todolistId2,
    //     value: newFilter
    // };

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(newFilter, todoListID_2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});




