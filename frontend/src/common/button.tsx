import React from 'react'
import { Styles } from '../styles'

export const Button: React.FC<React.ButtonHTMLAttributes<any>> = (props) => {
  return (
    <button
      {...props}
      style={{
        ...Styles.button,
        ...props.style,
      }}>
      {props.children}
    </button>
  )
}
