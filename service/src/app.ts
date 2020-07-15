import { ImagesWeb } from './modules/web'
import { DisposableService } from './models/disposable-service'
import { SerializeLifecycle } from './utils/serialize-lifecycle'

@SerializeLifecycle()
export class LimeCRMApp implements DisposableService {
  public webModule?: ImagesWeb

  public async dispose() {
    await Promise.all([this.webModule?.dispose()])
  }

  public async init() {
    this.webModule = new ImagesWeb()
    await Promise.all([this.webModule.init()])
  }
}
