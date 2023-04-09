import {ICommand} from "./interfaces";
import {BotPort} from "../ports";
import {Context} from "telegraf";
import type {ILogger, IProfanityService} from "../services";
import {ProfanityBuilder, Logger} from "../services"

export class Cooling implements ICommand {
    private logger: ILogger
    private profanityService: IProfanityService
    STATUS_PENDING = 0
    STATUS_ACTIVE = 1
    public description = 'Проветрить конфу, отключается через 8 сек'
    public name = 'cooling'
    public readonly type = 'private'
    timoutId: NodeJS.Timeout
    intervalId: NodeJS.Timer
    currentSymbol = String.fromCharCode(21325)
    replaceSymbol = String.fromCharCode(21328)
    currentStep = 1
    lastMessageId: number
    chatId: number
    status: number = this.STATUS_PENDING

    constructor(private readonly bot: BotPort) {
        this.logger = new Logger()
        this.profanityService = new ProfanityBuilder()
    }

    initCommand(): void {
        this.bot.command(this.name, this.executeCommand.bind(this))
    }

    async executeCommand(ctx: Context) {
        if (this.status === this.STATUS_ACTIVE) {
            return await ctx.reply(this.failedMessage)
        }

        clearTimeout(this.timoutId)
        clearInterval(this.intervalId)
        this.currentSymbol = String.fromCharCode(21325)
        this.replaceSymbol = String.fromCharCode(21328)

        this.increasedCurrentStep()

        await this.sendMessage(ctx)

        this.timoutId = this.startTimer()

        // this.intervalId = setInterval(async () => {
        //     await this.editMessage(ctx)
        //
        //     this.swapSymbol()
        // }, 800)
    }

    startTimer() {
        return setTimeout(this.setDefaultState.bind(this), 8000)
    }

    setDefaultState() {
        clearTimeout(this.timoutId)
        clearInterval(this.intervalId)
        this.currentStep = 1
        this.status = this.STATUS_PENDING
    }

    async sendMessage(context: Context) {
        const messageInfo = await context.reply(this.currentSymbol.repeat(this.currentStep))

        const {message_id, chat: {id}} = messageInfo

        this.lastMessageId = message_id

        this.chatId = id
    }
    async editMessage(context: Context) {

        try {
            this.status = this.STATUS_ACTIVE

            const text = this.currentSymbol.repeat(this.currentStep).replaceAll(this.currentSymbol, this.replaceSymbol)

            await context.telegram.editMessageText(this.chatId, this.lastMessageId, undefined, text)
        } catch (error) {
            // @ts-ignore
            this.logger.warning(error?.response.description)

        } finally {
            this.status = this.STATUS_PENDING
        }


    }

    swapSymbol() {
        const [current, replace] = [this.currentSymbol, this.replaceSymbol]

        this.currentSymbol = replace
        this.replaceSymbol = current
    }

    increasedCurrentStep() {
        this.currentStep += 8
    }

    get failedMessage() {
        const message = this.profanityService
            .addVerb()
            .addAdjective()
            .addNoun()
            .getProfanity()

        return message
    }

}
