export interface ILogger {
    error: (message: string) => void
    info: (message: string) => void
    warning: (message: string) => void
}
