import React, { createContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'vertical' | 'horizontal'
type SelectCallback = (selectedIndex: number) => void

export interface MenuProps {
  mode?: MenuMode
  defaultIndex?: number
  onSelect?: SelectCallback
  className?: string
  style?: React.CSSProperties
}
interface MenuContextProps {
  index: number,
  onSelect?: SelectCallback
}

export const MenuContext = createContext<MenuContextProps>({
  index: 0,
})

const Menu: React.FC<MenuProps> = (props) => {
  const { mode, defaultIndex, onSelect, className, style, children } = props
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const [currentActive, setActive] = useState(defaultIndex)
  const handleClick = (index: number) => {
    setActive(index)
    onSelect && onSelect(index)
  }
  const passedProps: MenuContextProps = {
    index: currentActive || 0,
    onSelect: handleClick
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
        return React.cloneElement(childElement, { index })
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
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu