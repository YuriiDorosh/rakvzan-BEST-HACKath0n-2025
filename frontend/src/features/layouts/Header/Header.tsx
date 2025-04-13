import { Box, Button, Drawer, Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import {ReactComponent as LogoImage} from '../../../app/assets/images/logo.svg'
import { useDispatch } from "react-redux";
import { changeOpenState } from "../../../app/store/authMenuSlice";
import LoginPage from "../../auth/loginPage/LoginPage";
import UserPage from "../../userPage/UserPage";

const Header = () => {

    const dispatch = useDispatch()
    const [isAccountPageOpen, setIsAccountPageOpen] = useState<boolean>(false)
    
    return (
        <Box
            sx={{
                display : 'flex',
                justifyContent: 'space-between',
                padding: '19px 42px'
            }}
        >
            <Drawer 
                anchor="top" 
                open={isAccountPageOpen} 
                onClose={() => setIsAccountPageOpen(false)}
            >
                <UserPage
                    handleClose={() => setIsAccountPageOpen(false)}
                />
            </Drawer>
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
                <Typography 
                    variant="subtitle2"
                    onClick={()=>{
                        setIsAccountPageOpen(!isAccountPageOpen)
                    }}
                >
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