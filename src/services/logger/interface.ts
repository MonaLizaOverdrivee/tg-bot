export interface ILogger {
    error: (message: any) => void
    info: (message: any) => void
    warning: (message: string) => void
}
