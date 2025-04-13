import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, colors, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLazyGetListQuery } from "./userSLice";
import Comment from "../map/components/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface UserPageInterface {
    handleClose: () => void
}

const UserPage: FC<UserPageInterface>  = ({
    handleClose
}) => {
    const [triggerGetList, {data}] = useLazyGetListQuery()

    useEffect(() => {
        triggerGetList({by_me: true})
    }, [])

    return (
        <Box
            sx={{
                height: '100svh'
            }}
        >
            <ArrowBackIcon
                sx={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px'
                }}
                onClick={()=>{
                    handleClose()
                }}
            />
            <Box
                sx={{
                    height: '30svh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}
            >
                <Avatar sx={{ height: '10svh', width: '10svh' }}>H</Avatar>
                <Typography sx={{ color: colors.common.black }} variant="h3">
                    {localStorage.getItem('username')}
                </Typography>
            </Box>
            <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
            <Typography variant="subtitle1">Відгуки</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {data?.data?.map((value: any) => {
                    return(
                        <Comment
                            value={value}
                        />
                    )
                })}
            </AccordionDetails>
        </Accordion>
        </Box>
    )
}
export default UserPage