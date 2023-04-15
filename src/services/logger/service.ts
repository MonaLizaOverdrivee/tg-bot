import {pino} from 'pino'
import type {Logger as PinoLogger} from 'pino'
import {ILogger} from "./interface";
export class Logger implements ILogger{
    private logger: PinoLogger
    constructor() {
        this.logger = pino({
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    timestampKey: 'time',
                    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                    include: 'level,time,msg,err',
                }
            },
            timestamp: true,
        })
    }

    public error(message: any): void {
        this.logger.error(message)
    }

    public info(message: any): void {
        this.logger.info(message)
    }

    public warning(message: string): void {
        this.logger.warn(message)
    }
}
