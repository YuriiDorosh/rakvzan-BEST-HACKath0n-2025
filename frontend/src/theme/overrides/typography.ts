import { colors, createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        h2: {
            fontWeight: 600,
            fontSize: '64px'
        },
        h3: {
            fontSize: '48px',
            textTransform: 'uppercase',
            color: colors.common.white,
            fontWeight: 700
        },
        subtitle2: {
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '100%'
        },
        subtitle1: {
            fontSize: '24px',
            fontWeight: 600,
            lineHeight: '100%'
        },
        h5:{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px'
        }

    }
})