import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import { MenuItemProps } from './menuItem'
import { MenuContext } from './menu'

interface SubMenuProps {
  title: string
  index?: number
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({title, index, className, children}) => {
  const menuContext = useContext(MenuContext)
  const classes = classnames('menu-item submenu-item', className, {
    'is-active': menuContext.index === index
  })
  const [menuOpen, setOpen] = useState(false)

  // vertical 状态下是点击
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  // horizontal 状态下是悬浮
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()
    clearTimeout(timer)
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300);
  }

  const clickEvents = menuContext.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const mouseEvents = menuContext.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
  } : {}

  const renderChildren = () => {
    const subMenuClasses = classnames('submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childComponent = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childComponent.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childComponent, {
          index: `${index}-${i}`
        })
      } else {
        console.error('Warning: submenu has a child which is not a MenuItem Component')
      }
    })
    return (
      <ul className={ subMenuClasses }>
       {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...mouseEvents}>
      <div className="submenu-title" {...clickEvents}>{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu