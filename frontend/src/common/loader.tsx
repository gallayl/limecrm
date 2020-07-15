import React, { HTMLProps } from 'react'
import '../assets/loader.css'

export const Loader: React.FC<HTMLProps<any>> = (props) => {
  return (
    <div
      style={{
        ...((props && props.style) || {}),
      }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}>
        <div className="three col">
          <div className="loader" id="loader-1"></div>
        </div>
      </div>
    </div>
  )
}
