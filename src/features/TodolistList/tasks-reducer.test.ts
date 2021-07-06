

import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC} from './todolists-reducer';
import {TaskPriorities, TasksStatuses} from "../../api/todolist-api";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: ''},
            { id: "2", title: "JS", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: '' },
            { id: "3", title: "React", status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId2",
                order: 0, addedDate: ''},
            { id: "2", title: "milk", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId2",
                order: 0, addedDate: '' },
            { id: "3", title: "tea", status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId2",
                order: 0, addedDate: ''}
        ]
    };

})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: ''},
            { id: "2", title: "JS", status: TasksStatuses.Completed, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: '' },
            { id: "3", title: "React", status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId2",
                order: 0, addedDate: ''},


            { id: "3", title: "tea", status: TasksStatuses.New, description: '', completed: true,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId2",
                order: 0, addedDate: ''}

        ]
    });

});

test('correct task should be added to correct array', () => {
const task = { id: "new Id", title: "new title", status: TasksStatuses.New, description: '', completed: true,
    priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: "todolistId2",
    order: 0, addedDate: ''}
    const action = addTaskAC(task);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('new title');
    expect(endState["todolistId2"][0].status).toBe(TasksStatuses.New);
})

test('status of specified task should be changed', () => {


    const action = updateTaskAC("todolistId2", "2", {status: TasksStatuses.New});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TasksStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TasksStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "2", {title: 'eagle'} );

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('eagle');
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
const todolist = {id: "todolistId3", addedDate: '2021', order: 5, title: "new todolist"}
    const action = addTodoListAC(todolist);

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {


    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
    expect(endState["todolistId2"]).toBeUndefined();
});




