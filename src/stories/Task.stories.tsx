import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from '../AddItemForm';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {TaskPriorities, TasksStatuses} from "../api/todolist-api";

export default {
  title: 'Todolist/Task',
  component: Task,
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove Button inside Task clicked')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;
const baseArgs = {
  changeTaskStatus: changeTaskStatusCallback,
  changeTaskTitle: changeTaskTitleCallback,
  removeTask: removeTaskCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  task: {id: '1', title: 'JS', status: TasksStatuses.Completed, description: '', completed: true,
    priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: 'todolistID1',
    order: 0, addedDate: ''},
  todoListId: 'todolistID1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  ...baseArgs,
  task: {id: '2', title: 'HTML', status: TasksStatuses.New, description: '', completed: true,
    priority: TaskPriorities.Hi, startDate: '', deadline: '', todoListId: 'todolistID1',
    order: 0, addedDate: ''},
  todoListId: 'todolistID1',
};

