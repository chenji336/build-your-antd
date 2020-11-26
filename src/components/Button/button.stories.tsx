import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from "@storybook/addon-actions"

import  Button, { ButtonProps } from './button';

export default {
  title: 'Component/Button', // title 和 目录（这里包含两层目录）
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button onClick={action('click')} {...args}>test</Button>;

export const ButtonWithType = Template.bind({});
ButtonWithType.args = {
  btnType: 'primary',
  href: 'https://www.baidu.com'
};
// 修改 button.tsx 之后会自动推断生成 argTypes
// ButtonWithType.argTypes = {
//   btnType: {
//     control: {
//       type: 'inline-radio',
//       options: ['primary', 'danger' , 'default' , 'link']
//     }
//   }
// }

export const ButtonWithDisable = Template.bind({});
ButtonWithDisable.args = {
  disabled: false
};

export const ButtonWithSize = Template.bind({});
ButtonWithSize.args = {
  size: "lg"
};
// ButtonWithSize.argTypes = {
//   size: {
//     control: {
//       type: 'inline-radio',
//       options: [ButtonSize.Small, ButtonSize.Large]
//     }
//   }
// }

