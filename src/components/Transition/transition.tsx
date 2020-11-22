import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName
}

const Transition: React.FC<TransitionProps> =(props) => {
  const {
    children,
    animation,
    classNames,
    ...restProps
  } = props
  
  /** start: 给 children 添加 ref */

  // nodeRef 解决 CSSTransition 的问题 
  // fix: https://github.com/reactjs/react-transition-group/issues/668
  // https://github.com/reactjs/react-transition-group/blob/1fd4a65ac45edd2aea3dec18eeb8b9c07c7eb93f/CHANGELOG.md#features
  const nodeRef = useRef(null)
  let childrenEnhance: React.FunctionComponentElement<any> = <div>只是个占位符号，避免报错</div>
  React.Children.map(children, (child, index) => {
    const childElement = child as React.FunctionComponentElement<any>
    const cloneChildElement = React.cloneElement(childElement, {
      ref: nodeRef
    })
    // CSSTransition 必须包含一个根元素，所以这个定义会有一个元素
    if (index === 0) {
      childrenEnhance = cloneChildElement
    }
    return cloneChildElement
  })

   /** end: 给 children 添加 ref */

  return (
    <CSSTransition 
      {...restProps} 
      classNames={classNames ? classNames : animation}
      nodeRef={nodeRef}
    >
      {childrenEnhance}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  appear: true,
  unmountOnExit: true,
}

export default Transition
