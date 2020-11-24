import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import  Button, { ButtonProps } from './button';

export default {
  title: 'Component/Button', // title 和 目录（这里包含两层目录）
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>test</Button>;

export const Type = Template.bind({});
Type.args = {
  btnType: 'primary'
};
Type.argTypes = {
  btnType: {
    control: {
      type: 'inline-radio',
      options: ['primary', 'danger' , 'default' , 'link']
    }
  }
}

export const Disable = Template.bind({});
Disable.args = {
  disabled: false
};

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };

// export const Click = Template.bind({});
// Click.args = {
//   size: 'small',
//   label: 'Button',
//   onClick() { console.log('button click') }
// };
