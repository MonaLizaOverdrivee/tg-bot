export interface Middleware {
    execute: () => void
}

export type CommandType = 'private' | 'public'
