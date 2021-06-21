import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';
import { AddItemForm, AddItemFormPropsType } from '../AddItemForm';
import {action} from "@storybook/addon-actions";
import { EditableSpan, EditableSpanPropsType } from '../EditableSpan';

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: 'Value EditableSpan changed'
    },
    title: {
      defaultValue: 'HTML',
      description: 'Start value EditableSpan'
    }
  },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  // title: 'value',title: 'value',
  changeTitle: action('Value EditableSpan changed'),
};

