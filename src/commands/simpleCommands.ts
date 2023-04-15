import {ICommand} from './interfaces'
import {BotPort} from '../ports'

export class SimpleCommands {
    public commands: ICommand[] = [
        {
            initCommand: () => this.replyAnimation('bazaj', 'https://fotosbor.com/files/2019/10/IMGGIF15722968817Lk71m/1572296881vhO9RI.gif', '@Chayula  зачилься сись'),
            name: 'bazaj',
            description: 'Выдать базу по жк',
            type: 'private',
        },
        {
            initCommand: () => this.replyText('baza', 'Пах чмо'),
            name: 'baza',
            description: 'Выдать базу по паху',
            type: 'private',
        },
        {
            initCommand: () => this.replyText('bazat', 'Ткачепч жидохохол'),
            name: 'bazat',
            description: 'выдать базу по ткачепчу',
            type: 'private',
        },
        {
            initCommand: () => this.replyText('check', 'Вечная Слава A.G.'),
            name: 'check',
            description: 'Рассовая проверка',
            type: 'private',
        },
    ]

    constructor(private readonly bot: BotPort) {}
    private replyText(commandName: string, text: string): void {
        this.bot.command(commandName, async (ctx) => await ctx.reply(text))
    }

    private replyAnimation(commandName: string, link: string, caption?: string) {
        this.bot.command(commandName, async (ctx) => await ctx.replyWithAnimation(link, {caption}))
    }
}
