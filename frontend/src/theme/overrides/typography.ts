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
        h4: {
            fontSize: '40px',
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
        },
        marker_title: {
            fontSize: '14px',
            fontWeight: 600,
        },
        marker_sub_title: {
            fontSize: '14px',
            fontWeight: 400,
            marginTop: '6px'
        },
        marker_list_component: {
            fontSize: '14px',
            fontWeight: 400,
            marginTop: '6px'
        },
        detail_list_subtitle: {
            fontSize: '12px',
            fontWeight: 400,
            marginTop: '6px'
        },
        detail_list_accessability: {
            fontSize: '10px',
            fontWeight: 500,
        },

    }
})