import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactNode }  from 'react'
import classnames from 'classnames'

export type ButtonType = 'primary' | 'danger' | 'default' | 'link'

export type ButtonSize = 'lg' | 'sm'

interface BaseButtonProps {
  size?: ButtonSize,
  /**
   * 不叫做 type，是因为 type 是 button 默认属性
   */
  btnType?: ButtonType,
  children: ReactNode,
  className?: string,
  href?: string,
  disabled?: boolean,
}

type NativeButtonProps = ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
type AnchorButonProps = AnchorHTMLAttributes<HTMLElement> & BaseButtonProps
export type ButtonProps = Partial<NativeButtonProps & AnchorButonProps> // button 和 a 不一定有各自的属性，所以做为可选

// react-docgen-typescript-loader Limitations: https://github.com/strothj/react-docgen-typescript-loader#limitations
// 即使 export default Buttton，也需要 export const Button

/**
 * # 这是我们第一个 Button 组件
 * 可以这里写 md 格式
 * 
 * ```js
 * console('文档测试')
 * ```
 */
export const Button: FC<ButtonProps> = (props) => {
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
    disabled: disabled && btnType === 'link'
  })

  return (
    <>
      {
        btnType === 'link' && href ?
          <a className={classes} href={href} {...restProps}> {children} </a> :
          <button className={classes} disabled={disabled} {...restProps}> {children} </button>
      }
    </>
  )
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button