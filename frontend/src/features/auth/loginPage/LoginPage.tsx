import { Box, Button, colors, Drawer, Grid, Typography } from "@mui/material"
import { ReactComponent as LeftPartImage } from './assets/images/LeftPartImage.svg'
import { useDispatch, useSelector } from "react-redux";
import { changeActiveForm, changeOpenState } from "../../../app/store/authMenuSlice";
import type { RootState } from "../../../app/baseStore";
import { useEffect } from "react";
import { ReactComponent as LogoImage } from '../../../app/assets/images/logo.svg' 
import LoginForm from "./loginForm";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
    
    const dispatch = useDispatch()
    
    const authMenu = useSelector((state: RootState) => state.authMenu);

    useEffect(() => {
        console.log(authMenu)
    }, [authMenu])

    return (
        <Drawer 
            open={authMenu.isModalOpen} 
            onClose={()=>dispatch(changeOpenState(false))}
            anchor="top"
        >
            <Box
                sx={{
                    background: colors.common.white,
                    height: '100svh'
                }}
            >
                <Grid container sx={{ height: '100svh' }}>
                    <Grid size={6}>
                        <LeftPartImage
                            style={{
                                width: '100%',
                                height: '100svh',
                                objectFit: 'contain'

                            }}
                        />
                    </Grid>
                    <Grid 
                        size={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <LogoImage/>
                        <Typography variant="subtitle1" sx={{ margin: '24px 0 8px 0' }}>
                            {authMenu.activeForm === 'log'? 'Увійти':'Зареєструватись'}
                        </Typography>
                        <Typography variant="h5">
                            Введіть свої дані щоб{authMenu.activeForm === 'log'? 'увійти':'зареєструватись'}
                        </Typography>
                        {authMenu.activeForm === 'log'? 
                            <LoginForm/>
                        :<RegisterForm/>}
                        {authMenu.activeForm === 'log'? 
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: 'center',
                                marginTop: '24px'
                            }}
                        >
                            У вас ще немає облікового запису?
                            <Button
                                sx={{
                                    textTransform: 'capitalize'
                                }}
                                onClick={()=>{
                                    if (authMenu.activeForm === 'log'){
                                        dispatch(changeActiveForm('reg'))
                                    } else {
                                        dispatch(changeActiveForm('log'))
                                    }
                                }}
                            >
                                Зареєструватись
                            </Button>
                        </Box>
                        :
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: 'center',
                            marginTop: '24px'
                        }}
                    >
                        Вже маєте обліковий запис?
                        <Button
                            sx={{
                                textTransform: 'capitalize'
                            }}
                            onClick={()=>{
                                if (authMenu.activeForm === 'log'){
                                    dispatch(changeActiveForm('reg'))
                                } else {
                                    dispatch(changeActiveForm('log'))
                                }
                            }}
                        >
                            Увійдіть
                        </Button>
                    </Box>}
                    <Button
                            sx={{
                                textTransform: 'capitalize'
                            }}
                            onClick={()=>{
                                dispatch(changeOpenState(false))
                                
                            }}
                        >
                            Закрити
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    )
}
export default LoginPage