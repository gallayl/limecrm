import React from 'react'
import { MainWrapper } from './layout'

export const App: React.FunctionComponent = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        fontFamily: 'system-ui, system-ui, sans-serif',
      }}>
      <MainWrapper />
    </div>
  )
}
