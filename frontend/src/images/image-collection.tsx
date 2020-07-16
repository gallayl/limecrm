import { models } from 'common'
import React, { useState } from 'react'
import { Styles } from '../styles'
import { AddImage } from './add-image'
import { ImageItem } from './image-item'

export const ImageCollection: React.FC<{ images: models.Image[] }> = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState<models.Image[]>(images)
  return (
    <>
      <AddImage style={Styles.contentItems} onImageUploaded={(image) => setLoadedImages([image, ...loadedImages])} />
      {loadedImages.map((image) => (
        <ImageItem {...image} key={image.id} />
      ))}
    </>
  )
}
