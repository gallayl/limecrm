import { LimeCRMApp } from './app'
import { expectIsDisposableService } from './test-utils/expect-is-disposable-service-lifecycle'

describe('App', () => {
  expectIsDisposableService(LimeCRMApp)
})
