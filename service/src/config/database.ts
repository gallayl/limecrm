import { CreateDatabaseOptions } from 'sequelize'
import { Logger } from '../modules/logger'

export const getDatabaseConfig = (options: { logger: Logger }) => ({
  options: {
    dialect: 'sqlite',
    storage: process.env.IMAGES_DB || '.data/images.sqlite',
    logging: options.logger.info,
  } as CreateDatabaseOptions,
})
