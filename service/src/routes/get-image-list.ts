import { Handler } from 'express'
import { ImageDb } from '../modules/image-db'

export const createGetImageListRoute: (db: ImageDb) => Handler = (db) => async (_req, resp) => {
  const images = await db.getImages({
    order: [['creationDate', 'desc']],
  })
  resp.json(images)
}
