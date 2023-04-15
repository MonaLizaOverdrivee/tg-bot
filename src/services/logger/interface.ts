export interface ILogger {
    error: (message: string) => void
    info: (message: any) => void
    warning: (message: string) => void
}
