export interface ICommand {
    initCommand: () => void
    description: string
    name: string
    type: 'public' | 'private'
}

export interface ICommandsFactory {
    getCommands: () => ICommand[]
    getLocalCommands: () => Promise<ICommand[]>
}
