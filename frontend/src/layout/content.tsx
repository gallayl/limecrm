import React, { Suspense } from 'react'
import { config, models } from 'common'
import { Styles } from '../styles'
import { ImageCollection } from '../images/image-collection'
import { Loader } from '../common/loader'
import ErrorIcon from '../assets/error.svg'

const ImageList = React.lazy(async () => {
  try {
    const { service } = config.Hosts
    const response = await fetch(`${service.baseUrl}:${service.port}${service.urls.getImageList}`)
    if (response.ok) {
      const images: models.Image[] = await response.json()
      return {
        default: () => <ImageCollection images={images} />,
      }
    }
  } catch (error) {
    /** */
  }
  return {
    default: () => (
      <div style={{ ...Styles.common.fillCenter, flexDirection: 'column' }}>
        <img src={ErrorIcon} alt="error-icon" style={{ width: '128px', marginBottom: '2em' }} />
        <div>There was an error loading the images. Is your service running?</div>
      </div>
    ),
  }
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
        <Suspense
          fallback={
            <div style={{ ...Styles.common.fillCenter, flexDirection: 'column' }}>
              <Loader style={{ width: '64px', height: '64px' }} />
              <div>Loading images...</div>
            </div>
          }>
          <ImageList />
        </Suspense>
      </div>
    </>
  )
}
