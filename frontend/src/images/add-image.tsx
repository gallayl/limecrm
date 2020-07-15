import React, { useState } from 'react'
import { models } from 'common'
import { UploadButton } from './upload-button'
import { UploadModal } from './upload-modal'

export const AddImage: React.FC<{ style?: React.CSSProperties; onImageUploaded: (image: models.Image) => void }> = ({
  style,
  onImageUploaded,
}) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <UploadButton onClick={() => setIsOpened(true)} style={style} />
      <UploadModal isOpened={isOpened} onClose={() => setIsOpened(false)} onImageUploaded={onImageUploaded} />
    </>
  )
}
