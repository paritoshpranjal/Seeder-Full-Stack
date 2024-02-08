import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import CashKickModal, { CashKickModalProps } from '.';


export default {
    title: 'organisms/CashKickModal',
    component: CashKickModal
} as Meta;

const Template: StoryFn<CashKickModalProps> = (args) => <CashKickModal {...args} />;


export const Default = Template.bind({});
Default.args = {
  width: '400px',
  isOpen: true,
  handleCrossIconClick: () => action('Cross icon clicked'),
  handleCancelClick: () => action('Cancel button clicked'),
  handleCreateClick: () => action('Create button clicked'),
  onNameChange: (newName: string) => action('Name changed:'),
};

export const Modal = Template.bind({});
Modal.args = {
  ...Default.args,
  width: '600px',
};
