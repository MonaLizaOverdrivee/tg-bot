import {ProfanityRepository} from './repository'
import {IProfanityRepository, IProfanityService} from "./interface";

export class ProfanityBuilder implements IProfanityService{
    private profanity: string[] = [];
    private readonly profanityRepository: IProfanityRepository

    constructor() {
        this.profanityRepository = new ProfanityRepository()
    }

    addShout() {
        const shout = this.profanityRepository.getDictionary().shout;
        const word = shout[this.getRandomIndex(this.getSize(shout))];

        this.profanity.push(word);

        return this;
    }

    addAdjective() {
        const {adjective} = this.profanityRepository.getDictionary().masculine;
        const size = this.getSize(adjective);
        const randomIndex = this.getRandomIndex(size);

        this.profanity.push(adjective[randomIndex]);

        return this;
    }

    addNoun() {
        const {noun} = this.profanityRepository.getDictionary().masculine;
        const size = this.getSize(noun);
        const randomIndex = this.getRandomIndex(size);

        this.profanity.push(noun[randomIndex]);

        return this;
    }

    addCustomPhrase(phrase: string) {
        this.profanity.push(phrase);

        return this;
    }

    getProfanity() {
        const resultProfanity = this.profanity.join(" ");

        this.profanity = []

        return resultProfanity
    }

    private getRandomIndex(range: number) {
        return Math.floor(Math.random() * range);
    }

    private getSize(arr: string[]): number {
        return arr.length;
    }
}
