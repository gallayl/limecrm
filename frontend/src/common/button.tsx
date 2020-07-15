import React, { useState } from 'react'
import { Styles } from '../styles'

export const Button: React.FC<React.ButtonHTMLAttributes<any>> = (props) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
      style={{
        ...Styles.button,
        backgroundColor: isHovered ? Styles.colors.limeDark : Styles.colors.lime,
        cursor: 'pointer',
        transition: 'background linear 150ms',
        ...props.style,
      }}>
      {props.children}
    </button>
  )
}
