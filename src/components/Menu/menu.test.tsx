import React from 'react'
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

let wrapper: RenderResult
let wrapper2: RenderResult
let menuElement: HTMLElement
let activeElement: HTMLElement
let disabledElement: HTMLElement
let thirdElement: HTMLElement

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}
const testVerProps: MenuProps = {
  mode: 'vertical',
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

function generateMenu(props: MenuProps) {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>third</MenuItem>
      {/* 放开会提示错误，因为已经做了判断 */}
      {/* <li>chenji</li> */}
    </Menu>
  )
}

describe('test menu and menuItem', () => {
  // beforeEach 每次运行前会执行 cleanUp 函数,清空页面中的元素
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
    thirdElement = wrapper.getByText('third')
  })

  // 测试属性
  it('should render correct component base on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.querySelectorAll(':scope>li').length).toEqual(3) // '>li' 会报错，获取不到一级子元素 
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  // 测试行为
  it('click items should change active element and call the right callback', () => {
    fireEvent.click(thirdElement)
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    expect(thirdElement).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')

    // 点击 disabled 情况
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })

  // 测试 mode 是 vertical
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup() // 需要清空, 否则提示 “Found multiple elements by: [data-testid="test-menu"]”
    wrapper2 = render(generateMenu(testVerProps))
    menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

})
