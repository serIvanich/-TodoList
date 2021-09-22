import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {addTodoListThunk} from "./todolist-actions";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodolistDomainType> = [];
    const todoList = {id: "todolistId3", addedDate: '2021', order: 5, title: "new todolist"}
    const action = addTodoListThunk.fulfilled({todoList: todoList}, 'requestId', {title: todoList.title});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodoLists).toBe(action.payload.todoList.id);
});








