import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonType, ButtonSize, ButtonProps } from './button'

const defaultProps: ButtonProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Small,
  className: 'test-class'
}

const linkProps: ButtonProps = {
  btnType: ButtonType.Link,
  href: 'https://www.baidu.com'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

// test('my first react test case', () => {
//   const wrapper = render(<Button>Nice</Button>)
//   const dom = wrapper.queryByText('Nice')
//   // expect(dom).toBeTruthy() // jest 默认支持的断言
//   expect(dom).toBeInTheDocument() // jest-dom 增加的断言，如果没有在 setupTests 中 import 进入 jest-dom 则不会有
// })

describe('test Button component', () => {
  // it 等价 test
  it('shoud render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('shoud render the correct component base on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-sm test-class') // class 中的顺序无关
  })

  it('should render a link  when btnType equals link and href is provided', () => {
    const wrapper = render(<Button {...linkProps}>Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn-link')
  })

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Link</Button>)
    const element = wrapper.getByText('Link') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})