export type T = any
export interface ICommonState<T> {
    code: number
    data: T
    msg: string
}

export type IRootState = any

export type IStore = IRootState & ICommonState<T>
