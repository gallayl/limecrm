import { Handler } from 'express'
import { ImageBinaryStore } from '../modules/image-binary-store'

export const createGetImageRoute: (binaryStore: ImageBinaryStore) => Handler = (store) => async (req, resp) => {
  const { id: uid } = req.params

  if (!uid) {
    resp.status(400).json({ error: 'missing ID' })
    return
  }
  if (!store.hasFile(uid)) {
    resp.status(404).send({ error: 'file not found' })
    return
  }

  resp.sendFile(store.getFilePath(uid))
}
