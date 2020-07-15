import React, { CSSProperties, SVGProps } from 'react'
import { Button } from '../common'

export const UploadButton: React.FC<{
  onClick: () => void
  height?: SVGProps<unknown>['height']
  style?: CSSProperties
}> = ({ onClick, height, style }) => {
  return (
    <Button onClick={onClick} style={style}>
      <svg
        viewBox="0 0 24 24"
        height={height || '100px'}
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd">
        <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
      </svg>
    </Button>
  )
}
