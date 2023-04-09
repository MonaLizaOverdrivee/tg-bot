import {IHttpClient} from './interface'
import {HttpConfigPort, HttpPort, HttpRequestConfigPort, HttpResponsePort} from '../../ports'
import axios from 'axios'

export class HttpService implements IHttpClient{
    private httpClient: HttpPort

    constructor(config: HttpConfigPort = {}) {
        this.httpClient = axios.create(config)
    }

    get<Response = any, Data = any>(url?: string, config?: HttpRequestConfigPort<Data>): Promise<HttpResponsePort<Response>> {
        return this.httpClient.get(url = '/', config)
    }

}
