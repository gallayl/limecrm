import React, { useCallback, useState } from 'react'
import { config, models } from 'common'
import { Button, Modal } from '../common'
import { Loader } from '../common/loader'
import { UploadButton } from './upload-button'

export const UploadModal: React.FC<{
  isOpened: boolean
  onClose: () => void
  onImageUploaded: (image: models.Image) => void
}> = ({ isOpened, onClose, onImageUploaded }) => {
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(null)
  const [description, setDescription] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const send = useCallback(async () => {
    try {
      const { service } = config.Hosts
      setIsUploading(true)
      const form = new FormData()
      form.set('description', description)
      form.set('file', file as File)
      const response = await fetch(`${service.baseUrl}:${service.port}${service.urls.postImage}`, {
        method: 'POST',
        body: form,
      })
      if (response.ok) {
        const image: models.Image = await response.json()
        onImageUploaded(image)
        onClose()
      }
    } finally {
      setIsUploading(false)
    }
  }, [description, file, onImageUploaded, onClose])

  return (
    <Modal
      isOpened={isOpened}
      onClose={onClose}
      title="New Image"
      body={
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {isUploading ? (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                backgroundColor: '#eee',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Loader style={{ width: '128px', height: '128px', marginBottom: '2em' }} />
              Uploading Image...
            </div>
          ) : null}
          <form
            style={{ minWidth: '600px', margin: '2em', maxWidth: '100%', maxHeight: '100%' }}
            onSubmit={(ev) => {
              ev.preventDefault()
              send()
            }}>
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <UploadButton
                    style={{ width: '128px', height: '128px' }}
                    onClick={() => {
                      /** handled by file input */
                    }}
                  />
                  Only jpg or png
                </div>
                {filePreview ? (
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <img
                      src={filePreview.toString()}
                      alt="Upload preview"
                      style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '400px',
                        margin: '1em',
                        boxShadow: '3px 3px 8px',
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <input
                name="file"
                required
                id="uploadFile"
                type="file"
                onChange={(ev) => {
                  const newFile = ev.target?.files?.[0]
                  setFile(newFile || null)
                  if (newFile) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      e.target?.result && setFilePreview(e.target.result)
                    }
                    reader.readAsDataURL(newFile)
                  }
                }}
                style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                accept="image/x-png,image/jpeg"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '3em 0 5em 0' }}>
              <label htmlFor="uploadDescription" style={{ marginBottom: '0' }}>
                Description
              </label>
              <textarea
                name="description"
                required
                id="uploadDescription"
                onChange={(ev) => setDescription(ev.currentTarget.value)}
                style={{
                  width: '80%',
                  height: '8em',
                  resize: 'none',
                  border: '1px solid rgba(0,0,0,0.3)',
                  borderRadius: '3px',
                  backgroundColor: 'white',
                }}></textarea>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <span>
                {' '}
                By uploading an image, you accept our <a href="">Terms</a>
              </span>
              <Button style={{ padding: '.5em' }} type="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      }
    />
  )
}
