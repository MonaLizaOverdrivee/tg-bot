import {ICommand} from "./interfaces";
import {BotPort} from "../ports";
import {getCommandArguments} from "../utils/get-command-arguments";

export class Checkiq implements ICommand {
    public name = 'checkiq'
    public readonly type = 'public'
    public description = '@UserName проерит твой iq или твоего друга'

    constructor(private readonly bot: BotPort) {
    }
    initCommand(): void {
        this.bot.command(this.name, (context) => {
            const randomNum = Math.floor(Math.random() * 100);
            const userName = getCommandArguments(context.message.text) ?? `@${context.from.username ?? context.from.first_name}`

            return context.reply(`IQ ${userName} не больше ${randomNum} из 1488`);
        })
    }


}
