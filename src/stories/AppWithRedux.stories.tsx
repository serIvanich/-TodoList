import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';
import { AddItemForm, AddItemFormPropsType } from '../AddItemForm';
import {action} from "@storybook/addon-actions";
import AppWithRedux from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
  title: 'Todolist/AppWithRedux',
  component: AppWithRedux,
 decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {};

