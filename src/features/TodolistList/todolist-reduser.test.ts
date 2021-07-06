
import {
    ActionUnionType,
    addTodoListAC,
    removeTodoListAC,
    todoListsReducer,
    changeTodoListTitleAC,
    changeTodoListFilterAC,
    TodolistDomainType,
    FilterValuesType
} from "./todolists-reducer";
import {v1} from "uuid"

let todoListID_1: string
let todoListID_2: string


let startState: Array<TodolistDomainType>

beforeEach(() => {
    todoListID_1 = v1()
    todoListID_2 = v1()
    startState = [
        {id: todoListID_1, addedDate: '2020', order: 4, title: "one todolist", filter: 'all'},
        {id: todoListID_2, addedDate: '2021', order: 5, title: "two todolist", filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todoListID_1) )

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID_2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = "New TodoList";
    const todolist = {id: "todolistId3", addedDate: '2021', order: 5, title: newTodolistTitle, filter: 'all'}
    const endState = todoListsReducer(startState, addTodoListAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New TodoList";


    // const action: ActionUnionType = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     todoListID: todolistId2,
    //     title: newTodolistTitle
    //
    // };
    const endState = todoListsReducer(startState, changeTodoListTitleAC(todoListID_2, newTodolistTitle));

    expect(endState[0].title).toBe("one todolist");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";


    // const action: ActionUnionType = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     todoListID: todolistId2,
    //     value: newFilter
    // };

    const endState = todoListsReducer(startState, changeTodoListFilterAC(newFilter, todoListID_2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});




