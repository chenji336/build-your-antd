import React from 'react'
import classnames from 'classnames'

export enum ButtonType {
  Primary = 'primary',
  Danger = 'danger',
  Default = 'default',
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

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
type AnchorButonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps
export type ButtonProps = Partial<NativeButtonProps & AnchorButonProps> // button 和 a 不一定有各自的属性，所以做为可选

const Button: React.FC<ButtonProps> = (props) => {
  const {
    size,
    btnType,
    children,
    href,
    disabled,
    className,
    ...restProps
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
          <a className={classes} href={href} {...restProps}> {children} </a> :
          <button className={classes} disabled={disabled} {...restProps}> {children} </button>
      }
    </>
  )
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button