import React, { useContext } from 'react'
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
  console.log(menuContext.index , index)
  const classes = classnames('menu-item submenu-item', className, {
    'is-active': menuContext.index === index
  })

  const renderChildren = () => {
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
      <ul className='submenu'>
       {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu