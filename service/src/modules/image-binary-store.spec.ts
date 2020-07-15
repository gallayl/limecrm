import { ImageBinaryStore } from './image-binary-store'
import { expectIsDisposableService } from '../test-utils/expect-is-disposable-service-lifecycle'

describe('ImageBinaryStore', () => {
  expectIsDisposableService(ImageBinaryStore)
})
