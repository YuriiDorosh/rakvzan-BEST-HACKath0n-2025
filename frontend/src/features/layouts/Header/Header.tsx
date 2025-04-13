import { Box, Button, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import {ReactComponent as LogoImage} from '../../../app/assets/images/logo.svg'
import { useDispatch } from "react-redux";
import { changeOpenState } from "../../../app/store/authMenuSlice";
import LoginPage from "../../auth/loginPage/LoginPage";

const Header = () => {

    const dispatch = useDispatch()
    
    return (
        <Box
            sx={{
                display : 'flex',
                justifyContent: 'space-between',
                padding: '19px 42px'
            }}
        >
            <LoginPage/>
            <Box>
                <LogoImage
                    style={{
                        width: 'auto',
                        height: '40px'
                    }}
                />
            </Box>
            {localStorage.getItem('username')?
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Typography variant="subtitle2">
                    {localStorage.getItem('username')}
                </Typography>
                <Button
                    onClick={()=>{
                        localStorage.clear()
                        window.location.reload()
                    }}
                >
                    Вийти
                </Button>
            </Box>    
            :
                <Box>
                    <Button
                        sx={{
                            height: '36px'
                        }}
                        variant="contained"
                        onClick={()=>{
                            dispatch(changeOpenState(true))
                        }}
                    >
                        Увійти
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            marginLeft: '16px',
                            height: '36px',
                        }}
                    >
                        Зареєструватись
                    </Button>
                </Box>
            
            }
        </Box>
    );
};

export default Header;