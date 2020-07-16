import { DisposableService } from '../models/disposable-service'
import { Sequelize, DataTypes } from 'sequelize'
import { Logger } from './logger'
import { ImageModel, ImageCreationAttributes } from '../models/image-model'
import { SerializeLifecycle } from '../utils'
import { getDatabaseConfig } from '../config/database'

@SerializeLifecycle()
export class ImageDb implements DisposableService {
  private readonly logger = Logger.forService(this)

  private readonly config = getDatabaseConfig({ logger: this.logger })

  private readonly db = new Sequelize(this.config.options)

  public async addImage(image: ImageCreationAttributes) {
    const created = new ImageModel(image)
    return await created.save()
  }

  public getImages = ImageModel.findAll.bind(ImageModel)

  public async init() {
    ImageModel.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        width: {
          type: DataTypes.INTEGER.UNSIGNED,
        },
        height: { type: DataTypes.INTEGER.UNSIGNED },
        orientation: { type: DataTypes.INTEGER.UNSIGNED },
        creationDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        description: { type: DataTypes.STRING },
        fileName: { type: DataTypes.STRING },
        size: { type: DataTypes.DOUBLE },
        binaryId: { type: DataTypes.STRING, unique: true },
      },
      {
        sequelize: this.db,
        tableName: 'images',
      },
    )
    await this.db.authenticate({})
    await this.db.sync()
  }
  public async dispose() {
    await this.db.close()
  }
}
