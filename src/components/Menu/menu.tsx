import React from 'react'
import classNames from 'classnames'

type MenuMode = 'vertical' | 'horizon'

interface MenuProps {
  mode?: MenuMode
  defaultIndex?: number
  onSelect?: (selectedIndex: number) => void
  className?: string
  style?: React.CSSProperties
}

const Menu: React.FC<MenuProps> = (props) => {
  const { mode, defaultIndex, onSelect, className, style, children } = props
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical'
  })

  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizon',
}

export default Menu