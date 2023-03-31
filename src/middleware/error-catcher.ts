import {Middleware} from "./interface";
import {BotPort} from "../ports";
import {TelegramError} from 'telegraf'
import {ILogger, Logger} from "../services";

export class ErrorCatcher implements Middleware {
    private logger: ILogger
    constructor(private readonly bot: BotPort) {
        this.logger = new Logger()
    }
    execute(): void {
        this.bot.catch((error) => {
            this.logger.error(`${(error as TelegramError)?.response?.description ?? error}`)
        })
    }

}
