import { Box, colors, Grid, Typography } from "@mui/material"
import ContactForm from "./ContactForm"

const ContactPage = () => {
    return (    
        <Grid 
            container
            sx={{
                height: '100%'
            }}
            >
            <Grid 
                size={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: 'calc(100svh - 313px)',
                    flexDirection: 'column',
                    padding: '40px'
                }}
                
                >
                <Typography 
                    variant="h4" 
                    color={colors.blue[400]}
                    sx={{
                        marginLeft: '42px'
                    }}
                    >
                    Напишіть нам свій відгук  <br />
                    для допомоги іншим 
                </Typography>
                <Typography 
                    variant="subtitle2" 
                    sx={{
                        marginLeft: '42px'
                    }}
                    >
                    Для покращення місць для людей з обмеженими можливостями 
                </Typography>
            </Grid>
            <Grid 
                size={6} 
                sx={{
                    background: colors.blue[50]
                }}
            >
                <ContactForm/>
            </Grid>
        </Grid>
    )
}
export default ContactPage