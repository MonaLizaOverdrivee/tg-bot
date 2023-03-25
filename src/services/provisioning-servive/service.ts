import * as dictionary from '../../provisioning/dictionary.json'
import {Dictionary} from '../../provisioning/types'
import type {IProvisioningService} from "./interface";

class ProvisioningService implements IProvisioningService{
    private readonly dictionary: Dictionary
    constructor() {
        this.dictionary = dictionary as Dictionary

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
            console.log('[ProvisioningService] Неправильный словарь')
        } else {
            console.log('[ProvisioningService] Статические ресурсы подключены')
        }
    }
}
const service = new ProvisioningService()
export {service as ProvisioningService}
