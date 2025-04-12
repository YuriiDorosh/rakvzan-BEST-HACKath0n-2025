import { Box, Button } from "@mui/material";
import { FC, ReactNode } from "react";
import {ReactComponent as LogoImage} from './images/logo.svg'

const Header = () => {
    return (
        <Box
            sx={{
                display : 'flex',
                justifyContent: 'space-between',
                padding: '19px 42px'
            }}
        >
            <Box>
                <LogoImage
                    style={{
                        width: 'auto',
                        height: '40px'
                    }}
                />
            </Box>
            <Box>
                <Button
                    sx={{
                        height: '36px'
                    }}
                    variant="contained"
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
        </Box>
    );
};

export default Header;