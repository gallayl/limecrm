import { CreateDatabaseOptions } from 'sequelize'
import { Logger } from '../modules/logger'

export const getDatabaseConfig = (options: { logger: Logger }) => ({
  uri: 'sqlite::memory:',
  options: { logging: options.logger.info } as CreateDatabaseOptions,
})
