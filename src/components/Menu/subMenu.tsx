import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import { MenuItemProps } from './menuItem'
import { MenuContext } from './menu'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

interface SubMenuProps {
  title: string
  index?: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({title, index, className, children}) => {
  const menuContext = useContext(MenuContext)
  const openSubMenus = menuContext.defaultOpenSubMenus as Array<string>
  const isOpened = index && menuContext.mode === 'vertical' && openSubMenus.includes(index)
  const [menuOpen, setOpen] = useState(isOpened)
  const classes = classnames('menu-item submenu-item', className, {
    'is-active': menuContext.index === index,
    'is-opened': menuOpen,
    'is-vertical': menuContext.mode === 'vertical',
  })

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
      'menu-opened': menuOpen,
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
      <Transition
        in={menuOpen as boolean} 
        animation="zoom-in-top"
        timeout={300}
        // addEndListener={(done: any) => {
        //   // use the css transitionend event to mark the finish of a transition
        //   // explicit（严格模式）：只有一个参数 done
        //   // implicit（含蓄模式）：两个参数 node, done(官网的例子是 implicit 模式)
        //   console.log('node:', nodeRef.current); // 获取到 dom
        //   (nodeRef.current as any).addEventListener('transitionend', done, false);
        // }}
      >
        <ul className={ subMenuClasses }>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...mouseEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu