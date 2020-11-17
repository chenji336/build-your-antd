import React, { createContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'vertical' | 'horizontal'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  mode?: MenuMode
  defaultIndex?: string
  onSelect?: SelectCallback
  className?: string
  style?: React.CSSProperties
  // 1. 可能有多个 menu 子菜单，所以需要数组
  // 2. 只在 vertical 模式下展开
  defaultOpenSubMenus?: string[]
}
interface MenuContextProps {
  index: string,
  onSelect?: SelectCallback,
  mode?: MenuMode,
  defaultOpenSubMenus?: string[],
}

export const MenuContext = createContext<MenuContextProps>({
  index: '0',
})

const Menu: React.FC<MenuProps> = (props) => {
  const { mode, defaultIndex, onSelect, className, style, defaultOpenSubMenus, children } = props
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const [currentActive, setActive] = useState(defaultIndex)
  const handleClick = (index: string) => {
    setActive(index)
    onSelect && onSelect(index)
  }
  const passedProps: MenuContextProps = {
    index: currentActive || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  // 解决问题：
  // 1. 如果子元素不是 menuItem 则提示错误
  // 2. MenuItem index 可以默认生成
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // child 添加默认 index
        return React.cloneElement(childElement, { 
          index: index.toString() 
        })
      } else {
        console.error('Warning: menu has a child which is not a MenuItem or SubMenu Component')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedProps}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu