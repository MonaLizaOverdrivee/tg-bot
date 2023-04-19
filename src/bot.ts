import {Telegraf} from 'telegraf'
import {BotPort} from './ports'
import type {IConfigInterface} from './services'
import type {ICommandsFactory} from './commands'
import {CommandsFactory} from './commands/index.js'
import {ConfigService} from "./services/index.js";
import {CommandsAccessMiddleware, ErrorCatcher} from "./middleware";
import type {Middleware} from "./middleware";


export class Bot {
    public bot: BotPort
    private readonly commandsService: ICommandsFactory
    private readonly configService: IConfigInterface

    constructor() {
        this.configService = new ConfigService()

        const token = this.configService.get('TOKEN')

        this.bot = new Telegraf(token)

        this.commandsService = new CommandsFactory(this.bot)
    }

    async initCommands() {
        const commands = this.commandsService.getCommands()
        const localCommand = await this.commandsService.getLocalCommands()

        for (const command of [...commands, ...localCommand]) {
            command.initCommand()
        }

        const release = '*Release:* 1.0!'
        const lastUpdate = '*Last update*: \n - Добавлена команда /bazaj - выдать базу по жк \n - Бот перенесен на хостинг теперь он доступен 24/7'
        const commandsDescription = `*Commands*:\n${this.commandsService.getCommands().map(({name, description}) =>  `/${name} - ${description}`).join('\n')}`

        this.bot.help((ctx) => {
            ctx.replyWithMarkdown(`${release}\n\n${lastUpdate}\n\n${commandsDescription}`)
        })
    }

    async addCommandsDescription() {
        const commands = this.commandsService.getCommands()
        const localCommand = await this.commandsService.getLocalCommands()

        const commandsDescription = [...commands, ...localCommand].map(({name: command, description}) => ({command, description}))

        await this.bot.telegram.setMyCommands(commandsDescription)
    }

    useMiddleware() {
        const middlewares: Middleware[] = [
            new CommandsAccessMiddleware(this.commandsService.getCommands(), this.bot),
            new ErrorCatcher(this.bot),
        ]

        middlewares.forEach((middleware) => {
            middleware.execute()
        })
    }

    async start() {
        this.useMiddleware()

        await this.initCommands()

        await this.addCommandsDescription()

        await this.bot.launch({})

        console.log('[tg-bot] Server success started!')
    }
}
