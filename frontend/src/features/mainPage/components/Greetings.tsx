import { Box, Button, colors, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import { ReactComponent as MainPageIcon  } from "../images/mainPageIcon.svg"
import EditIcon from '@mui/icons-material/Edit'
import { Link } from "react-router-dom"

const Greetings = () => {
    return(
        <Grid container sx={{ width: '100%', padding: '42px' }}>
            <Grid size={7}>
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            marginBottom: '24px'
                        }}
                        variant="h4"
                    >
                        Inclusivemap
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            color: colors.common.black
                        }}
                    >
                        Місто для всіх знайди <br />
                        доступні місця поруч
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            marginTop: '27px'
                        }}
                    >
                        InclusiveMap допомагає людям з інвалідністю швидко <br />
                        знаходити зручні та безбар’єрні простори.
                    </Typography>
                    <Box
                        sx={{
                            marginTop: '59px'
                        }}
                    >
                        <Link to="/map">
                            <Button
                                variant='contained'
                            >
                                ЗНАЙТИ МІСЦЕ
                            </Button>
                        
                        </Link>
                        <Link to="/contact">
                            <Button
                                variant="outlined"
                                sx={{
                                    marginLeft: '32px'
                                }}
                            >
                                КОНТАКТИ
                            </Button>
                        </Link>
                    </Box>

                </Box>
            </Grid>
            <Grid size={5}>
                <MainPageIcon/>
            </Grid>
        </Grid>
    )
}
export default Greetings