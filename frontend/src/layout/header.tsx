import React from 'react'
import Lime from '../assets/lime.svg'
import { Styles } from '../styles'

export const Header: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: Styles.colors.lime,
        display: 'flex',
        filter: 'drop-shadow(8px 8px 32px black)',
      }}>
      <img style={{ margin: '0px 1em 0px 2em' }} src={Lime} alt="Lime Logo" />
      <h1
        style={{
          ...Styles.text.headerStyle,
        }}>
        LimeCRM
      </h1>
    </div>
  )
}
