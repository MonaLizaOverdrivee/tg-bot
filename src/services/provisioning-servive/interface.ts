import {Dictionary} from "../../provisioning/types";

export interface IProvisioningService {
    getDictionary: () => Dictionary
    getLocalCommands: () => Promise<unknown>
}
