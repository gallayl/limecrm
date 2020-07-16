import React from 'react'
import { Styles } from '../styles'

export const Modal: React.FC<{ title: string; body: JSX.Element; isOpened: boolean; onClose: () => void }> = ({
  isOpened,
  onClose,
  title,
  body,
}) => {
  return isOpened ? (
    <div
      style={{
        ...Styles.common.fillCenter,
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1,
      }}
      onClick={onClose}>
      <div
        onClick={(ev) => ev.stopPropagation()}
        style={{
          backgroundColor: '#eee',
          boxShadow: '4px 4px 32px rgba(0,0,0,0.8)',
          maxWidth: '100%',
          maxHeight: '100%',
        }}>
        <h2
          style={{
            margin: '0.3em 1em',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: Styles.text.defaultColor,
          }}>
          <div style={{ fontWeight: 'bolder' }}>{title}</div>
          <div onClick={() => onClose()} style={{ cursor: 'pointer', fontWeight: 'lighter' }}>
            x
          </div>
        </h2>
        {body}
      </div>
    </div>
  ) : null
}
