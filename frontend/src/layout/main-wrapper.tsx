import React from 'react'
import { Styles } from '../styles'
import { Header } from './header'
import { Content } from './content'

export const MainWrapper: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        color: Styles.text.defaultColor,
      }}>
      <Header />
      <Content />
    </div>
  )
}
