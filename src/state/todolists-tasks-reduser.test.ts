import {TasksStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, todoListsReducer} from "./todolists-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    // {'vvv': []}
    // [{id: 'vvv', title: "new todolist", filter: 'all'}]

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});








