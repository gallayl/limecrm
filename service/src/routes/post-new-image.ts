import { Handler } from 'express'
import { IncomingForm, Fields, Files } from 'formidable'
import { ImageDb } from '../modules/image-db'
import { imageSize } from 'image-size'
import { ImageBinaryStore } from '../modules/image-binary-store'

export const createPostNewImageRoute: (db: ImageDb, binaryStore: ImageBinaryStore) => Handler = (
  db,
  binaryStore,
) => async (req, resp) => {
  const form = new IncomingForm({
    captureRejections: true,
  })
  const parsedData = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) =>
    form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files }))),
  )

  const { file } = parsedData.files
  if (!file) {
    resp.status(400).json({ error: 'Missing file' })
    return
  }
  const { description } = parsedData.fields

  if (!description || typeof description !== 'string') {
    resp.status(400).json({ error: 'Description bad or missing' })
    return
  }

  const { width, height, orientation } = await new Promise<{ width: number; height: number; orientation: number }>(
    (resolve, reject) =>
      imageSize(file.path, (err, result) => {
        err
          ? reject(err)
          : resolve({ width: result?.width || 0, height: result?.height || 0, orientation: result?.orientation || 0 })
      }),
  )

  const binaryId = await binaryStore.upload(file)

  try {
    const created = await db.addImage({
      description,
      size: file.size,
      fileName: file.name,
      width,
      height,
      binaryId,
      orientation,
    })

    resp.json(created.toJSON())
    return
  } catch (error) {
    resp.status(500).json({ error })
  }
}
