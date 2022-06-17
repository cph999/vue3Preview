import { Module } from 'vuex'
import { IAccount, ILoginData } from '@/types/login'
import { IRootState } from './types'
import { asyncAccountLogin, asyncLogout } from '../service/login/login'
import { useSessionCache } from '../utils/use-storage'
import router from '../router/index'
import { ElMessage } from 'element-plus'

export const loginModule: Module<any, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            id: 0,
            username: '',
            password: '',
            status: '',
            roles: [],
            token: '',
        }
    },
    mutations: {
        changeUserName(state, username: string) {
            state.username = username
        },
    },
    actions: {
        async accountLogin({ commit }, payload: IAccount) {
            const { data } = await asyncAccountLogin(payload)

            if (data) {
                useSessionCache.setCache('token', data.data.token)
                useSessionCache.setCache('username', data.data.username)
                commit('changeUserName', data.data.username)
                if (useSessionCache.getCache('token')) {
                    router.push('/special')
                }
            }
        },
        async logout({ commit }, payload: IAccount) {
            const data = await asyncLogout()

            if (data) {
                ElMessage.success("µÇ³ö³É¹¦")
                useSessionCache.clearCache()
                router.push('/login')
            }
        },
    },
}
