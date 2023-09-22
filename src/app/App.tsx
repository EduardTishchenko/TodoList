import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {AppRootStateType, useAppDispatch, useAppSelector} from './store'
import {initializedAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'

import {Login} from "../features/Login/Login";

import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    const status = useSelector<AppRootStateType,RequestStatusType>((state) => state.app.status)
    const initialized = useSelector<AppRootStateType, boolean>((state) =>state.app.initialized)
   const  dispatch= useAppDispatch()
    useEffect(()=>{
dispatch( initializedAppTC())
    },[])
if(!initialized) {
    return <div style={{position:'fixed',top:'30%',textAlign:'center',width:'100%'}}>
        <CircularProgress />
    </div>
}
    return (
        <BrowserRouter>
            <div className="App">

                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>

<Routes>
    <Route   path='/' element ={ <TodolistsList/>}/>
    <Route path='/login' element={ <Login/>}/>
    <Route path='*' element={<h1>404: PAGE NOT FOUND </h1>}/>
</Routes>




                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App
