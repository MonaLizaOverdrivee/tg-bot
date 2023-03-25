import {Dictionary} from "../../provisioning/types";

export interface IProfanityService {
    addShout: () => this
    addAdjective: () => this
    addNoun: () => this
    addCustomPhrase: (phrase: string) => this
    getProfanity: () => string

}

export interface IProfanityRepository {
    getDictionary: () => Dictionary
}
