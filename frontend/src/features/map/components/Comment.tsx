import { Avatar, Box, colors, Rating, Typography } from "@mui/material"
import { FC } from "react"

interface CommentInterface {
    value: any
}

const Comment: FC<CommentInterface> = ({ value }) => {
    return(
        <Box
            sx={{
                background: colors.grey[200],
                borderRadius: '20px',
                padding: '12px',
                maxWidth: '320px'
            }}
        >
            <Box
                sx={{
                    display: 'flex'
                }}
            >
                <Avatar 
                    alt={value.user_name} 
                    src="/static/images/avatar/1.jpg"
                    />
                    <Box
                        sx={{
                            marginLeft: '10px'
                        }}
                    >
                        <Typography>
                            {value.user_name}
                        </Typography>
                        <Box>
                            <Rating name="read-only" value={value.rating} readOnly />
                        </Box>
                    </Box>
            </Box>
            {value.comment}
        </Box>
    )
}
export default Comment