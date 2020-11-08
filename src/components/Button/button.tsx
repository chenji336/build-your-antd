import React from 'react'
import classnames from 'classnames'

export enum ButtonType {
  Primary = 'primary',
  Danger = 'danger',
  Default = 'defaul',
  Link = 'link',
}

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

interface BaseButtonProps {
  size?: ButtonSize,
  btnType?: ButtonType, // 不叫做 type，是因为 type 是 button 默认属性
  children: React.ReactNode,
  className?: string,
  href?: string,
  disabled?: boolean,
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const {
    size,
    btnType,
    children,
    href,
    disabled,
    className,
  } = props

  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: disabled && btnType === ButtonType.Link
  })

  return (
    <>
      {
        btnType === ButtonType.Link && href ?
          <a className={classes} href={href}> {children} </a> :
          <button className={classes} disabled={disabled}> {children} </button>
      }
    </>
  )
}

export default Button