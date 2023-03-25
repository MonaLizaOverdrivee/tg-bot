export interface ICommand {
    initCommand: () => void
    description: string
    name: string
}

export interface ICommandsFactory {
    getCommands: () => ICommand[]
    getLocalCommands: () => Promise<ICommand[]>
}
