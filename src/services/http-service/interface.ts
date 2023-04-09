import {AxiosResponse} from 'axios'
import {HttpRequestConfigPort} from '../../ports'


export interface IHttpClient {
    get: <Response = any, Data = any>(url?: string, payload?: HttpRequestConfigPort<Data>) => Promise<AxiosResponse<Response>>
}
