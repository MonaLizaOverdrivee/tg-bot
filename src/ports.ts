import {Telegraf} from "telegraf";
import {Axios, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults} from 'axios'

export type BotPort = Telegraf
export type HttpPort = Axios
export type HttpRequestConfigPort<D = any> = AxiosRequestConfig<D>
export type HttpConfigPort = CreateAxiosDefaults
export type HttpResponsePort<D> = AxiosResponse<D>
