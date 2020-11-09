import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

interface MenuItemProps {
  index: number
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index,
  })
  const handleClick = (index: number) => {
    context.onSelect && !disabled && context.onSelect(index)
  }

  return (
    <li className={classes} style={style} onClick={() => handleClick(index)}>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {
  index: 0,
  disabled: false,
}

export default MenuItem
