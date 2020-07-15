import { LimeCRMApp } from './app'
import { Logger } from './modules/logger'

const logger = Logger.withScope('Application Lifecycle')

const app = new LimeCRMApp()

const shutdown = async (errorCode = 0) => {
  try {
    await app.dispose()
    logger.info('Bye.')
    await logger.dispose?.()
    process.exit(errorCode)
  } catch (error) {
    logger.error('Failed to dispose App', error)
    process.exit(1)
  }
}

process.on('uncaughtException', (error) => {
  logger.error("Terminating app due an 'uncaughtException' event", error)
  shutdown(1)
})

process.on('unhandledRejection', (reason, origin) => {
  logger.error('Unhandled promise rejection', reason, origin)
  shutdown(1)
})

process.on('SIGINT', () => {
  logger.info("Terminating app due a 'SIGINT' event")
  shutdown()
})

process.on('SIGTERM', () => {
  logger.info("Terminating app due a 'SIGTERM' event")
  shutdown()
})

app.init().catch((error: any) => {
  logger.error('Application init error, exiting...', error)
  shutdown(1)
})
export { app }
