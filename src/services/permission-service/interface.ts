import {AllowedChatIds} from '../../types'

export interface AllowedChatIdsResponse {
    allowedChatIds: AllowedChatIds
}

export interface IPermissionService {
    getAllowedChatIds: () => Promise<AllowedChatIds>
}
