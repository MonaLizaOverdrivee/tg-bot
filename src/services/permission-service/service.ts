import {AllowedChatIds, IPermissionService} from "./interface";

export class PermissionService implements IPermissionService{
    async getAllowedChatIds(): Promise<AllowedChatIds> {
        const response =  await fetch('https://gist.githubusercontent.com/MonaLizaOverdrivee/853783981989ef5c3d629b15d0870564/raw/f265d545d0a18820951618b70beae2d088010981/permissions.json')

        return await response.json()
    }
}
