import {config, DotenvParseOutput} from 'dotenv'
import {IConfigInterface} from './interface'
import {ILogger, Logger} from "../logger";
export class ConfigService implements IConfigInterface{
    private readonly config: DotenvParseOutput
    private logger: ILogger

    constructor() {
        this.logger = new Logger()

        const {error, parsed} = config()

        if (error) {
            this.logger.error('[Service] Не добавлен .env файл')

            process.kill(process.pid, 'SIGINT')
        }

        if (parsed) {
            this.logger.info('[ConfigService] .env файл успешно инициализирован')

            this.config = parsed
        }
    }

    get(key: string) {
        return this.config[key]
    }
}
