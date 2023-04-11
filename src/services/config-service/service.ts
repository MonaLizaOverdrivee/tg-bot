import {config, DotenvParseOutput} from 'dotenv'
import {IConfigInterface} from './interface'
import {ILogger, Logger} from "../logger";
export class ConfigService implements IConfigInterface{
    private readonly config: DotenvParseOutput
    private logger: ILogger

    constructor() {
        this.logger = new Logger()

        this.config = this.isProd() ? this.getProdEnv() : this.getDevEnv() ?? {}
    }

    get(key: string) {
        return this.config[key]
    }

    getProdEnv(): DotenvParseOutput {
        const config: {[key: string]: string} = {}

        for (const key in process.env) {
            config[key] = process.env[key]!.trim()
        }

        this.logger.info('[ConfigService] Переменные окружения успешно инициализированы')

        return config
    }

    getDevEnv(): DotenvParseOutput | undefined {
        const {error, parsed} = config()

        if (error) {
            this.logger.error('[Service] Не добавлен .env файл')

            process.kill(process.pid, 'SIGINT')
        }

        if (parsed) {
            this.logger.info('[ConfigService] .env файл успешно инициализирован')

            return  parsed
        }
    }

    isProd(): boolean {
        if (process.env.NODE_ENV === undefined) {
            process.env.NODE_ENV = 'dev'
        }

        return process.env.NODE_ENV === 'production'
    }
}
