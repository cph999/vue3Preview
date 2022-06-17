export interface IAccount {
    username: string
    password: string
}

export interface IRootState {
    code: number
    msg: string
    data: any 
}

export interface ILoginData {
    id: number
    username: string
    password?: any
    date: string
    token: string
    name: string
	address: string
	icon: string
}
