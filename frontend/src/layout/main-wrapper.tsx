import React from 'react'
import { Styles } from '../styles'
import { Header } from './header'
import { Content } from './content'

export const MainWrapper: React.FC = () => {
  return (
    <div
      style={{
        ...Styles.common.fillCenter,
        position: 'fixed',
        top: 0,
        bottom: 0,
        flexDirection: 'column',
        alignItems: 'initial',
        color: Styles.text.defaultColor,
      }}>
      <Header />
      <Content />
    </div>
  )
}
