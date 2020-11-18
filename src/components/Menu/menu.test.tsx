import React from 'react'
import { render, fireEvent, RenderResult, cleanup, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

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
  defaultOpenSubMenus: ['4']
}

function generateMenu(props: MenuProps) {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>third</MenuItem>
      {/* 放开会提示错误，因为已经做了判断 */}
      {/* <li>chenji</li> */}
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
      <SubMenu title="dropdownOpened">
        <MenuItem>
          opened
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

function createStyleFile() {
  const cssFile = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  // style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

describe('test menu and menuItem', () => {
  // beforeEach 每次运行前会执行 cleanUp 函数,清空页面中的元素
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    // console.log(wrapper.container.outerHTML) // 看一下测试的html
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
    thirdElement = wrapper.getByText('third')
  })

  // 测试属性
  it('should render correct component base on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.querySelectorAll(':scope>li').length).toEqual(5) // '>li' 会报错，获取不到一级子元素 
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  // 测试行为
  it('click items should change active element and call the right callback', () => {
    fireEvent.click(thirdElement)
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
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

  // 测试 subMenu
  it('should show dropdown items when hover on subMenu', async () => {
    const dropdown = wrapper.getByText('dropdown')

    expect(wrapper.queryByText('drop1')).not.toBeVisible()

    fireEvent.mouseEnter(dropdown)
    // mouseEnter 有延时，所以需要使用异步
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })

    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

    fireEvent.mouseLeave(dropdown)
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })

  // 测试 vertical 状态下的 subMenu
  describe('test dropdown when mode is vertical', () => {
    beforeEach(() => {
      cleanup()
      wrapper2 = render(generateMenu(testVerProps))
      wrapper2.container.append(createStyleFile())
      menuElement = wrapper2.getByTestId('test-menu')
    })

    it('should render vertical submenu when set mode to vertical', () => {
      expect(menuElement).toHaveClass('menu-vertical')
    })

    it('should show dropdown items when click on subMenu for vertical mode', () => {
      expect(wrapper2.getByText('drop1')).not.toBeVisible()
      fireEvent.click(wrapper2.getByText('dropdown'))
      expect(wrapper2.getByText('drop1')).toBeVisible()
    })

    it('should show dropdown items when defaultOpenSubMenus contains subMenu index', () => {
      expect(wrapper2.getByText('opened')).toBeVisible()
    })

  })

})
