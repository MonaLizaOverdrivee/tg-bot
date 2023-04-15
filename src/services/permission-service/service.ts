import type {AllowedChatIdsResponse, IPermissionService} from './interface'
import type {IHttpClient} from '../http-service'
import type {AllowedChatIds} from '../../types'
import {HttpService} from '../http-service/index.js'

export class PermissionService implements IPermissionService{
    private httpClient: IHttpClient
    constructor() {
        this.httpClient = new HttpService({baseURL: 'https://gist.githubusercontent.com/MonaLizaOverdrivee/853783981989ef5c3d629b15d0870564/raw/ce9de34d3a9c9615a7bd99e2adcb49416fb51313/permissions.json'})
    }
    async getAllowedChatIds(): Promise<AllowedChatIds> {
        const {data: {allowedChatIds}} = await this.httpClient.get<AllowedChatIdsResponse>()

        return allowedChatIds
    }
}

