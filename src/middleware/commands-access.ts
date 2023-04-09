import {ICommand} from "../commands";
import {BotPort} from "../ports";
import {Middleware} from './interface'
import type {Message, MessageEntity} from '@grammyjs/types'
import {PermissionService} from "../services";
import type {IPermissionService} from "../services";
import {AllowedChatIds} from '../types'

export class CommandsAccessMiddleware implements Middleware{
    private readonly COMMAND_REG_EXP = /^\/([^ |@]+)/

    private commands: Pick<ICommand, 'type' | 'name'>[]

    private permissionService: IPermissionService

    private allowedChatIds: AllowedChatIds

    constructor(commands: ICommand[], private readonly bot: BotPort) {
        this.parseCommands(commands)

        this.permissionService = new PermissionService()

        this.permissionService.getAllowedChatIds().then((allowedChatIds) => this.allowedChatIds = allowedChatIds)
    }

    private parseCommands(commands: ICommand[]) {
        this.commands = commands.map(({type, name}) => ({type, name}))
    }

    async execute() {
        this.bot.use(async (context, next) => {
            const isAccess = this.checkAccess(context.message as Message)

            if (isAccess) {
                await next()

                return
            }


            await context.reply('пошел нахуй, нет такой команды')
        })
    }
    checkPublicType(text: string | undefined = '') {
        const [, command] = this.COMMAND_REG_EXP.exec(text) ?? []

        const {type} = this.commands.find(({name}) => name === command) ?? {}

        return type === 'public'
    }

    checkCommand(entity: MessageEntity[] | undefined): boolean {
        const [{type}] = entity ?? [{}]

        return type === 'bot_command' ?? false
    }

    checkAccess(message: Message): boolean {
        const isCommand = this.checkCommand(message?.entities)
        const isPublic = this.checkPublicType(message.text)
        const isAccess = !isCommand || isPublic

        if (isAccess) {
            return true
        }

        return this.allowedChatIds.includes(Math.abs(message.chat.id))
    }
}
