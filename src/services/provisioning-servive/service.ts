import * as dictionary from '../../provisioning/dictionary.json'
import {Dictionary} from '../../provisioning/types'
import type {IProvisioningService} from "./interface";
import {ILogger, Logger} from "../logger";

class ProvisioningService implements IProvisioningService{
    private readonly dictionary: Dictionary
    private logger: ILogger
    constructor() {
        this.dictionary = dictionary as Dictionary

        this.logger = new Logger()

        this.isValidProvisioning()
    }
    public getDictionary() {
        return this.dictionary
    }

    public async getLocalCommands() {
        const {localCommands} = await import('../../provisioning/local.commands')

        return localCommands
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
