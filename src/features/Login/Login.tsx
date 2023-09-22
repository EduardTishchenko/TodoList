import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./login-reducer";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate, useNavigate} from "react-router-dom";
import {useEffect} from "react";



 export  function Loginii (props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export  function Login() {
    const isLoginIn = useSelector<AppRootStateType, boolean>(state=> state.login.isLoginIn)
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
   const formik = useFormik ({
       validate:(values) => {
           if(!values.email) {
               return {
                   email:'Email is required'
               }
           }
           if(!values.password) {
               return {
                   email:'Password is required'
               }

           }
       },
       initialValues: {
           email: '',
           password: '',
           rememberMe: false
       },
       onSubmit:values => {
           dispatch( loginTC( values))

       },
   })
    useEffect(()=>{
        if( isLoginIn) {
            navigate("/login")
        }
    },[])

    return (

        <ThemeProvider theme={defaultTheme}>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"

                            autoComplete="email"
                            autoFocus
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email && formik.touched.email && formik.errors.email}
                        <TextField
                            margin="normal"
                            required
                            fullWidth

                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password && formik.touched.password && formik.errors.password}
                        <FormControlLabel
                            control={<Checkbox  color="primary"    {...formik.getFieldProps("remember")} />}
                            label="Remember me"
                            checked={formik.values.rememberMe}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>

    );
}