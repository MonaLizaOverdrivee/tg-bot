import {Telegraf} from 'telegraf'
import {BotPort} from './ports'
import type {IConfigInterface} from './services'
import type {ICommandsFactory} from './commands'
import {CommandsFactory} from "./commands/commands-factory"
import {ConfigService} from "./services";


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
    }

    async addCommandsDescription() {
        const commands = this.commandsService.getCommands()
        const localCommand = await this.commandsService.getLocalCommands()

        const commandsDescription = [...commands, ...localCommand].map(({name: command, description}) => ({command, description}))

        await this.bot.telegram.setMyCommands(commandsDescription)
    }

    async start() {
        await this.initCommands()

        await this.addCommandsDescription()

        await this.bot.launch()
        console.log('[tg-bot] Server success started!')
    }
}
