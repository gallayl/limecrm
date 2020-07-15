import { ImagesWeb } from './web'
import { expectIsDisposableService } from '../test-utils/expect-is-disposable-service-lifecycle'

describe('ImagesWeb', () => {
  expectIsDisposableService(ImagesWeb)
})
