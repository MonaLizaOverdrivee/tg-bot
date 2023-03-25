import {ProvisioningService} from "../provisioning-servive/service";
import {IProfanityRepository} from "./interface";

export class ProfanityRepository implements IProfanityRepository{
    private readonly provisioningService
    constructor() {
        this.provisioningService = ProvisioningService
    }
    getDictionary() {
        return this.provisioningService.getDictionary()
    }
}
