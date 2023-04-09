import {BotPort} from '../ports'
import type {IProfanityService} from "../services";
import {ProfanityBuilder} from "../services";
import {getCommandArguments} from "../utils/get-command-arguments";
import {ICommand} from "./interfaces";
export class PickCommand implements ICommand{
    public name = 'pick'
    public readonly type = 'public'
    public description = '@UserName Вежливо позвать друга'
    private readonly profanityService: IProfanityService
    constructor(private readonly bot: BotPort) {
        this.profanityService = new ProfanityBuilder()
    }

    initCommand() {
        this.bot.command(this.name, async (context) => {
            const userName = getCommandArguments(context.message.text) ?? ''

            const profanity = this.profanityService
                .addShout()
                .addAdjective()
                .addNoun()
                .addCustomPhrase(userName)
                .getProfanity()

            await context.reply(profanity)
        })
    }
}
