import { IRootState } from './types'
import { loginModule } from './login'
import { IStore } from './types'
import { createStore, Store, useStore as useVuexStore } from 'vuex'


export const store = createStore<IRootState>({
    modules: {
        loginModule,
        subjectModule,
        courseModule,
        sectionModule
    },
})

export function useStore(): Store<IStore> {
    return useVuexStore()
}
