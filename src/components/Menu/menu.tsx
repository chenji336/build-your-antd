import React, { createContext, useState } from 'react'
import classNames from 'classnames'

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
    'menu-vertical': mode === 'vertical'
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

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedProps}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu