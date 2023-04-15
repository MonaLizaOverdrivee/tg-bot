import {Dictionary} from '../../provisioning/types'
import type {IProvisioningService} from "./interface";
import {ILogger, Logger} from "../logger";
import type {IHttpClient} from '../http-service'
import {HttpService} from '../http-service'

class ProvisioningService implements IProvisioningService{
    private dictionary: Dictionary
    private logger: ILogger
    private readonly httpClient: IHttpClient
    constructor() {
        this.httpClient = new HttpService({baseURL: 'https://gist.githubusercontent.com/MonaLizaOverdrivee/6f04aace8b8c477d08203ec0909d0d9d/raw/'})
        this.logger = new Logger()

        this.httpClient.get<Dictionary>().then(({data: dictionary}) => {
            this.dictionary = dictionary

            this.isValidProvisioning()
        })



    }
    public getDictionary() {
        return this.dictionary
    }

    public async getLocalCommands() {
        try {

        // @ts-ignore
            const {localCommands} = await import('../../provisioning/local.commands')

        return localCommands
        } catch {
            return {}
        }
    }

    private isValidProvisioning() {
        const requiredKeys = ['masculine', 'shout']

        const isValidDictionary = requiredKeys.every((key) => Object.keys(this.dictionary).includes(key))

        if (!isValidDictionary) {
            this.logger.error('[ProvisioningService] Неправильный словарь')
        } else {
            this.logger.info('[ProvisioningService] Статические ресурсы подключены')
        }
    }
}
const service = new ProvisioningService()
export {service as ProvisioningService}
