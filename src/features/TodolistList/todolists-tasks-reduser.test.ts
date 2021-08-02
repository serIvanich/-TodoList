import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodoListAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
    const todolist = {id: "todolistId3", addedDate: '2021', order: 5, title: "new todolist"}
    const action = addTodoListAC({todoList: todolist});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodolists).toBe(action.payload.todoList.id);
});








