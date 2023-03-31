export interface AllowedChatIds {
    allowedChatIds: number[]
}

export interface IPermissionService {
    getAllowedChatIds: () => Promise<AllowedChatIds>
}
