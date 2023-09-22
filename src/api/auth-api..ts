import {AxiosResponse} from "axios";
import {instance, ResponseType, TodolistType} from "./todolists-api";


export const authApi = {
    login(data: LoginParamsType) {

        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data);
    },
    me() {
        return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me');


    }

}
//types
export type LoginParamsType = {
    email:string
    password:string
    rememberMe:boolean
    captcha?:string

}
