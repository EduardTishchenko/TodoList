
import {Dispatch} from 'redux'
import {ThunkDispatch} from "../TodolistsList/todolists-reducer";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {authApi, LoginParamsType} from "../../api/auth-api.";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState = {
    isLoginIn:false
}


const slice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers: {
        setIsLoginInAC(state , action:PayloadAction<{value:boolean}>) {
            state.isLoginIn = action.payload.value
        },

    }
})
export const authReducer = slice.reducer
export const {setIsLoginInAC} = slice.actions



//action creator


//thunks
export const loginTC =(data:LoginParamsType) =>(dispatch:Dispatch)=> {
dispatch(setAppStatusAC({status:'loading'}))
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(setIsLoginInAC({value: true} ))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}
//types








