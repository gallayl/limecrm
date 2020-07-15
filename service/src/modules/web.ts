import { Server, Socket } from 'net'
import { createServer } from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { DisposableService } from '../models/disposable-service'
import { SerializeLifecycle } from '../utils/serialize-lifecycle'
import { config } from 'common'
import { Logger } from './logger'
import { createGetImageListRoute } from '../routes/get-image-list'
import { createPostNewImageRoute } from '../routes/post-new-image'
import { ImageDb } from './image-db'
import { ImageBinaryStore } from './image-binary-store'
import { createGetImageRoute } from '../routes/get-image'

/**
 * Service that's responsible for serving the public API endpoint
 */
@SerializeLifecycle()
export class ImagesWeb implements DisposableService {
  public readonly hostConfig = config

  public logger = Logger.forService(this)

  public expressApp = express()
  public server!: Server
  private openedSockets = new Set<Socket>()
  private readonly imageDb = new ImageDb()
  private readonly binaryStore = new ImageBinaryStore()

  public async init() {
    const { baseUrl, port } = config.Hosts.service
    const { getImageList, getSingleImage, postImage } = config.Hosts.service.urls

    await this.imageDb.init()
    await this.binaryStore.init()

    this.expressApp.use(cors({ origin: config.Hosts.frontend }))

    this.expressApp.use(bodyParser.json())
    this.expressApp.use(bodyParser.urlencoded({ extended: true }))

    this.expressApp.get(getImageList, createGetImageListRoute(this.imageDb))
    this.expressApp.post(postImage, createPostNewImageRoute(this.imageDb, this.binaryStore))
    this.expressApp.get(getSingleImage, createGetImageRoute(this.binaryStore))

    await new Promise((resolve, reject) => {
      this.server = createServer(this.expressApp).listen({
        path: baseUrl,
        port,
      })
      this.server.once('listening', () => {
        this.logger.debug(`Listening at '${baseUrl}:${port}'`)
        resolve()
      })
      this.server.once('error', reject)
      this.server.on('connection', this.onConnection)
    })
  }

  public async dispose() {
    this.server &&
      this.server.listening &&
      (await new Promise((resolve, reject) => {
        this.server.close((err) => {
          if (err) {
            return reject(err)
          }
          resolve()
        })
      }))
    this.server && this.server.off('connection', this.onConnection)
    this.openedSockets.forEach((s) => s.destroy())
    this.imageDb.dispose()
  }

  private onConnection = (socket: Socket) => {
    this.openedSockets.add(socket)
    socket.once('close', () => this.openedSockets.delete(socket))
  }
}
