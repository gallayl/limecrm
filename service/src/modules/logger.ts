import { SerializeLifecycle } from '../utils'
import { DisposableService } from '../models/disposable-service'

@SerializeLifecycle()
export class Logger implements DisposableService {
  public async init() {
    /** */
  }

  public async dispose() {
    /** */
  }

  constructor(private readonly scope: string) {}

  /**
   * Factory for creating logger with a custom scope name
   *
   * @param scope the scope name
   * @returns the created Logger instance
   */
  public static withScope = (scope: string) => new Logger(scope)

  /**
   * Factory method to create logger for a specific service
   *
   * @param service The service instance
   * @returns the created Logger instance
   */
  public static forService = (service: DisposableService) => new Logger(service.constructor.name)

  private getPrefix = () => ` ${new Date().toISOString()} ${this.scope} > `

  public debug = (...args: any[]) => console.debug(`${this.getPrefix()}`, ...args)
  public info = (...args: any[]) => console.log(`${this.getPrefix()}`, ...args)
  public warn = (...args: any[]) => console.warn(`${this.getPrefix()}`, ...args)
  public error = (...args: any[]) => console.error(`${this.getPrefix()}`, ...args)
}
