import {
    addTodoListAC,
    changeTodoListEntityStatusAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    removeTodoListAC,
    TodolistDomainType,
    todoListsReducer
} from "./todolists-reducer";
import {v1} from "uuid"
import {RequestStatusType} from "../../app/app-reducer";

let todoListID_1: string
let todoListID_2: string


let startState: Array<TodolistDomainType>

beforeEach(() => {
    todoListID_1 = v1()
    todoListID_2 = v1()
    startState = [
        {id: todoListID_1, addedDate: '2020', order: 4, title: "one todolist", filter: 'all', entityStatus:'idle'},
        {id: todoListID_2, addedDate: '2021', order: 5, title: "two todolist", filter: 'all', entityStatus:'idle'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC({todoListID: todoListID_1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID_2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = "New TodoList";
    const todolist = {id: "todolistId3", addedDate: '2021', order: 5, title: newTodolistTitle, filter: 'all'}
    const endState = todoListsReducer(startState, addTodoListAC({todoList: todolist}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New TodoList";
    const endState = todoListsReducer(startState, changeTodoListTitleAC({todoListID: todoListID_2, title: newTodolistTitle}));

    expect(endState[0].title).toBe("one todolist");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";
    const endState = todoListsReducer(startState, changeTodoListFilterAC({value: newFilter, todoListID: todoListID_2}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {

    let entityStatus: RequestStatusType = "loading";
    const endState = todoListsReducer(startState, changeTodoListEntityStatusAC({id: todoListID_2, entityStatus}));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe('loading');
});




