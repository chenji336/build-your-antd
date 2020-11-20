import React from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

interface IconProps extends FontAwesomeIconProps{
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = props => {
  const { className, theme, ...restProps } = props
  const classes = classnames('icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon {...restProps} className={classes}></FontAwesomeIcon>
  )
}

export default Icon