import {ICommand} from "./interfaces";
import {BotPort} from "../ports";
import {Context} from "telegraf";
import {PermissionService} from "../services";
import type {IPermissionService} from "../services";

export class Colling implements ICommand {
    permissionService: IPermissionService
    STATUS_PENDING = 0
    STATUS_ACTIVE = 1
    public description = 'Проветрить конфу, отключается через 8 сек'
    public name = 'cooling';
    timoutId: NodeJS.Timeout
    intervalId: NodeJS.Timer
    currentSymbol = String.fromCharCode(21325)
    replaceSymbol = String.fromCharCode(21328)
    currentStep = 0
    lastMessageId: number
    chatId: number
    status: number = this.STATUS_PENDING
    allowChatIds: []

    constructor(private readonly bot: BotPort) {
        this.permissionService = new PermissionService()


       void new Promise(async (res) => {
           const {allowedChatIds} = await this.permissionService.getAllowedChatIds();

           res(allowedChatIds)
       }).then(data => this.allowChatIds = data)
    }

    initCommand(): void {
        this.bot.command(this.name, async (ctx) => {
            clearTimeout(this.timoutId)
            clearInterval(this.intervalId)

            if (!this.allowChatIds.includes(Math.abs(ctx.message.chat.id))) {
                return await ctx.reply('пошел нахуй, нет такой команды')
            }
            if (this.status === this.STATUS_ACTIVE) {
                return await ctx.reply('пошел нахуй, я еще не докрутил предыдущий вентилятор')
            }

            this.increasedCurrentStep()

            await this.sendMessage(ctx)

            this.timoutId = this.startTimer()

            this.intervalId = setInterval(async () => {
                await this.editMessage(ctx)

                this.swapSymbol()
            }, 600)
        })
    }

    startTimer() {
        return setTimeout(this.clearState.bind(this), 8000)
    }

    clearState() {
        clearTimeout(this.timoutId)
        clearInterval(this.intervalId)
        this.currentStep = 0

        this.currentSymbol = String.fromCharCode(21325)
        this.replaceSymbol = String.fromCharCode(21328)
    }

    async sendMessage(context: Context) {
        const messageInfo = await context.reply(this.currentSymbol.repeat(this.currentStep))

        const {message_id, chat: {id}} = messageInfo

        this.lastMessageId = message_id

        this.chatId = id
    }
    async editMessage(context: Context) {
        this.status = this.STATUS_ACTIVE

        const text = this.currentSymbol.repeat(this.currentStep).replaceAll(this.currentSymbol, this.replaceSymbol)

        await context.telegram.editMessageText(this.chatId, this.lastMessageId, undefined, text)

        this.status = this.STATUS_PENDING
    }

    swapSymbol() {
        const [current, replace] = [this.currentSymbol, this.replaceSymbol]

        this.currentSymbol = replace
        this.replaceSymbol = current
    }

    increasedCurrentStep() {
        this.currentStep += 3
    }

}
