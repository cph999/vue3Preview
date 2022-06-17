import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface PHInterceptor {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (err: any) => any
    responseInterceptor?: (res: AxiosResponse) => AxiosResponse
    responseInterceptorCatch?: (err: any) => any
}

export interface PHConfig extends AxiosRequestConfig {
    interceptors?: PHInterceptor
    isShowLoading?: boolean
}
