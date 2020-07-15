import { SerializeLifecycle } from '../utils'
import { DisposableService } from '../models/disposable-service'
import { promises } from 'fs'
import { Logger } from './logger'
import { BinaryStoreConfig } from '../config/binary-stores'
import { File } from 'formidable'
import { v4 } from 'uuid'
import { join, extname } from 'path'

@SerializeLifecycle()
export class ImageBinaryStore implements DisposableService {
  private readonly logger = Logger.forService(this)
  public async init() {
    try {
      await promises.access(BinaryStoreConfig.images)
    } catch (error) {
      this.logger.info(`Binary store doesn't exists at '${BinaryStoreConfig.images}', trying to create...`)
      await promises.mkdir(BinaryStoreConfig.images, { recursive: true })
    }
  }
  public async dispose() {
    /** */
  }

  public async upload(file: File): Promise<string> {
    const binaryId = v4() + extname(file.name)
    await promises.copyFile(file.path, join(BinaryStoreConfig.images, binaryId))
    return binaryId
  }

  public async hasFile(uid: string) {
    try {
      await promises.access(this.getFilePath(uid))
    } catch (error) {
      return false
    }
    return true
  }

  public getFilePath(uid: string) {
    return join(BinaryStoreConfig.images, uid)
  }
}
