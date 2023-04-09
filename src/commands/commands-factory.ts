import {ICommandsFactory, ICommand} from "./interfaces";
import {BotPort} from "../ports";
import {PickCommand} from './pick'
import {IProvisioningService, ProvisioningService} from "../services";
import {Checkiq} from "./checkiq";
import {Cooling} from "./cooling";

export class CommandsFactory implements ICommandsFactory {
    private readonly commands: ICommand[]
    private readonly provisioningService: IProvisioningService

    constructor(private readonly bot: BotPort) {
        this.commands = [
            new PickCommand(this.bot),
            new Checkiq(this.bot),
            new Cooling(this.bot)
        ]

        this.provisioningService = ProvisioningService
    }
    getCommands() {
        return this.commands
    }

    async getLocalCommands() {
        const localCommands = await this.provisioningService.getLocalCommands() as Record<string, {handler: () => void; name: string; description: string}>

        if (Object.keys(localCommands).length === 0) {
            return []
        }

        const commands = Object.keys(localCommands).map((key) => ({
            initCommand: () => this.bot.command(key, localCommands[key].handler),
            name: key,
            description: localCommands[key].description,
            type: 'public' as const
        }))

        return commands
    }
}
