import { config, models } from 'common'
import React, { HTMLProps, useCallback, useState } from 'react'
import { Styles } from '../styles'
import linkSvg from '../assets/link.svg'
import { humanReadableSize } from '../utils/human-readable-size'
import { formatDate } from '../utils/format-date'

export const GridLabel: React.FC<HTMLProps<any>> = ({ children, ...props }) => (
  <div
    {...props}
    style={{
      color: Styles.colors.lime,
      fontWeight: 'bolder',
      fontSize: '1.2em',
      verticalAlign: 'baseline',
      ...props.style,
    }}>
    {children}
  </div>
)

export const GridContent: React.FC<HTMLProps<any>> = ({ children, ...props }) => (
  <div
    {...props}
    style={{
      color: 'white',
      display: 'flex',
      alignItems: 'flex-end',
      fontSize: '1.1em',
      ...props.style,
    }}>
    {children}
  </div>
)

export const ImageItem: React.FC<{ style: React.CSSProperties; image: models.Image }> = ({ style, image }) => {
  const { service } = config.Hosts

  const [hovered, setHovered] = useState(false)
  const [imageUrl] = useState(
    `${service.baseUrl}:${service.port}${service.urls.getSingleImage.replace(':id', image.binaryId)}`,
  )

  const copyImageUrl = useCallback(() => {
    const el = document.createElement('textarea')
    el.value = imageUrl
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }, [imageUrl])

  const orientationsToRotate = [6, 8]

  const originalOrientation = image.width > image.height ? 'landscape' : 'portrait'
  const parsedOrientation = orientationsToRotate.includes(image.orientation)
    ? originalOrientation === 'portrait'
      ? 'landscape'
      : 'portrait'
    : originalOrientation

  return (
    <div
      style={{
        ...Styles.contentItems,
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 400ms cubic-bezier(0.470, 0.000, 0.745, 0.715)',
        boxShadow: hovered ? '3px 3px 10px rgba(0,0,0,0.8)' : '5px 5px 25px rgba(0,0,0,0.6)',
        borderRadius: '8px',
        ...style,
      }}
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}>
      <img
        src={imageUrl}
        style={{
          maxWidth: parsedOrientation === 'portrait' ? '100%' : 'auto',
          maxHeight: parsedOrientation === 'landscape' ? '100%' : 'auto',
          objectFit: 'cover',
          transform: hovered ? 'scale(1)' : 'scale(1.05)',
          transition: 'transform 700ms cubic-bezier(0.470, 0.000, 0.745, 0.715)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          opacity: hovered ? 1 : 0,
          backdropFilter: hovered ? 'blur(10px)' : 'none',
          transition: 'opacity 200ms cubic-bezier(0.470, 0.000, 0.745, 0.715)',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <div style={{ display: 'flex', padding: '1em', justifyContent: 'space-between' }}>
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <GridLabel
              title={image.fileName}
              style={{ textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: 300, fontSize: '1.4em' }}>
              {image.fileName}
            </GridLabel>
            <p style={{ color: 'white', fontWeight: 'bolder' }} title={`${image.size} bytes`}>
              {humanReadableSize(image.size)}
            </p>
          </div>
          <img src={linkSvg} style={{ cursor: 'pointer' }} title="Copy Link" onClick={copyImageUrl} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '0.5em', margin: '0 1em' }}>
          <GridLabel>Uploaded:</GridLabel>
          <GridContent>{formatDate(new Date(image.creationDate))}</GridContent>
          <GridLabel>Size:</GridLabel>
          <GridContent>
            {image.width} x {image.height}
          </GridContent>
        </div>
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <GridLabel style={{ margin: '1em 1em 0 1em' }}>Description</GridLabel>
          <GridContent
            style={{
              display: 'inline',
              margin: '1em',
              fontWeight: 'lighter',
              fontSize: '1em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {image.description}
          </GridContent>
        </div>
      </div>
    </div>
  )
}
