import { ImageDb } from './image-db'
import { expectIsDisposableService } from '../test-utils/expect-is-disposable-service-lifecycle'

describe('ImageDB', () => {
  expectIsDisposableService(ImageDb)
})
