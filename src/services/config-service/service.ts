import {config, DotenvParseOutput} from 'dotenv'
import {IConfigInterface} from './interface'
export class ConfigService implements IConfigInterface{
    private readonly config: DotenvParseOutput

    constructor() {
        const {error, parsed} = config()

        if (error) {
            console.log('[Service] Не добавлен .env файл')

            process.kill(process.pid, 'SIGINT')
        }

        if (parsed) {
            console.log('[ConfigService] .env файл успешно инициализирован')

            this.config = parsed
        }
    }

    get(key: string) {
        return this.config[key]
    }
}
