import axios, { AxiosInstance } from 'axios'
import 'nprogress/nprogress.css'
import * as nprogress from 'nprogress'
import { PHConfig, PHInterceptor } from './core/types'
import { ElMessage } from 'element-plus'
import router from '../../router/index'
import { useSessionCache } from '../../utils/use-storage'

class PHRequest {
	instance: AxiosInstance
	isShowLoading?: boolean
	interceptors?: PHInterceptor

	constructor(config: PHConfig) {
		// 每次创建实例的时候，都调用axios.create方法
		// axios.create可以返回一个axios实例
		// 这样保证我们可以使用不同的配置创建多个axios实例
		this.instance = axios.create(config)
		this.isShowLoading = config.isShowLoading ? config.isShowLoading : true
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorCatch
		)
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorCatch
		)

		//拦截器实现 request
		this.instance.interceptors.request.use(
			(config) => {
				if (this.isShowLoading) {
					nprogress.start()
				}
				return config
			},
			(err) => {
				if (this.isShowLoading) {
					nprogress.set(0.7)
					ElMessage.error('网络错误')
					setTimeout(() => {
						nprogress.done()
					}, 1000)
				}
				return err
			}
		)

		//拦截器实现 response
		this.instance.interceptors.response.use(
			(res: any) => {
				if (this.isShowLoading) {
					nprogress.done()
				} else if (res.data === 'Full authentication is required to access this resource') {
					router.push('/login')
				}
				return res
			},
			(err) => {
				if (this.isShowLoading) {
					nprogress.set(0.7)
					ElMessage.error('未知错误')
					setTimeout(() => {
						nprogress.done()
					}, 1000)
				}
				router.push('/login')
				return err
			}
		)
	}

	//真正发出请求的地方 
	//promise 泛型
	request <T>(config: any): Promise<T> {
		config.headers.token = useSessionCache.getCache('token')

		return new Promise((resolve, reject) => {
			if (config.interceptors?.requestInterceptor) {
				config = config.interceptors.requestInterceptor(config)
			}

			this.instance
				.request<any, T>(config)
				.then((res) => {
					this.isShowLoading = true
					resolve(res)
				})
				.catch((err) => {
					this.isShowLoading = true
					reject(err)
					return err
				})
		})
	}
	
	//请求的具体封装
	get<T>(config: PHConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' })
	}

	post<T>(config: PHConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' })
	}

	delete<T>(config: PHConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' })
	}

	put<T>(config: PHConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'PUT' })
	}

	patch<T>(config: PHConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'PATCH' })
	}
}

export default PHRequest
