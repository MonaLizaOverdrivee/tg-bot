type PartOfSpeech = {
    noun: string[]
    adjective: string[]
    verb: string[]
}
export interface Dictionary {
    shout: string[]
    masculine: PartOfSpeech
}
