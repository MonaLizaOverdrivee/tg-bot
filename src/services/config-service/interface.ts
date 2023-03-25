import {DotenvParseOutput} from 'dotenv'

export interface IConfigInterface {
    get: (key: string) => string
}
