import { DisposableService } from '../models/disposable-service'

export const expectIsDisposableService = <T extends DisposableService, TArgs extends any[]>(
  serviceCtor: { new (...args: TArgs): T },
  ...args: TArgs
): void => {
  describe(`${serviceCtor.name} should be a disposable service`, () => {
    it('Can be initialized and disposed', async () => {
      const instance = new serviceCtor(...args)
      await instance.init()
      await instance.dispose()
    })

    it('Can be gracefully disposed w/o init', async () => {
      const instance = new serviceCtor(...args)
      await instance.dispose()
    })
  })
}
