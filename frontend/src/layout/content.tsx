import React, { Suspense } from 'react'
import { config, models } from 'common'
import { Styles } from '../styles'
import { ImageCollection } from '../images/image-collection'

const ImageList = React.lazy(async () => {
  const { service } = config.Hosts
  const response = await fetch(`${service.baseUrl}:${service.port}${service.urls.getImageList}`)
  if (response.ok) {
    const images: models.Image[] = await response.json()
    return {
      default: () => <ImageCollection images={images} />,
    }
  }
  return { default: () => <div>There was an error loading the images. Is your service running?</div> }
})

export const Content: React.FC = () => {
  return (
    <>
      <h1 style={{ color: Styles.text.defaultColor, margin: '2em 0 0 1em', fontWeight: 900 }}>Uploaded images</h1>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexWrap: 'wrap',
          overflow: 'auto',
        }}>
        <Suspense fallback={<div></div>}>
          <ImageList />
        </Suspense>
      </div>
    </>
  )
}
