import PHRequest from '../core/index'
import { ICommonState } from '../store/types'
import { IAccount } from '../types/login'
import { useSessionCache } from '../../utils/use-storage'

enum Login {
    accountLogin = '/login',
}

export function asyncAccountLogin(payload: IAccount) {
    return PHRequest.post<ICommonState<any>>({
        url: Login.accountLogin,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            token: useSessionCache.getCache('token'),
        },
    })
}

//退出
export function asyncLogout() {
    return 1
}
