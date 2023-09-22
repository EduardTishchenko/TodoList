import {authApi} from "../api/auth-api.";
import {Dispatch} from "redux";
import {setIsLoginInAC} from "../features/Login/login-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}


const slice = createSlice({
    name:'app',
    initialState:initialState,
    reducers: {
        setAppErrorAC(state , action:PayloadAction<{error:string | null}>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action:PayloadAction<{status:RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action:PayloadAction<{value:boolean}>) {
            state.initialized = action.payload.value
        }
    }
})
export const appReducer = slice.reducer
export const {setAppInitializedAC,setAppErrorAC,setAppStatusAC} = slice.actions


//export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  //  switch (action.type) {
   //     case 'APP/SET-STATUS':
      //      return {...state, status: action.status}
    //    case 'APP/SET-ERROR':
    //        return {...state, error: action.error}
     //   case 'APP/SET-INITIALIZED':
    //        return {...state,initialized:action.value}
    //    default:
    //        return {...state}
   // }
//}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    initialized: boolean
}

//export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
//export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
//export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)


export const initializedAppTC = () => (dispatch: Dispatch) => {
authApi.me()
    .then(res=>{
        if(res.data.resultCode===0){
            dispatch(setAppInitializedAC({value:true}))

        }
        else {

        }
        dispatch(setIsLoginInAC({value:true}))
    })
}
//export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
//export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

//type ActionsType =
 //   | SetAppErrorActionType
 //   | SetAppStatusActionType
 //   | ReturnType<typeof setAppInitializedAC>
