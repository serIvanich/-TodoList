import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from './AddItemForm';
import {action} from "@storybook/addon-actions";

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked'
        },
    },
} as Meta;

const asyncCallback = async (...params: any []) => {
    action('Button inside form clicked')(...params)
}

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: asyncCallback,
};
export const AddItemFormDisabledExample = Template.bind({});
AddItemFormDisabledExample.args = {
    addItem: asyncCallback,
    disabled: true

};

