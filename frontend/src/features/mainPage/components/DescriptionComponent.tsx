import { Box, colors, Typography } from "@mui/material"
import { FC, ReactNode } from "react"
import { DescritopnType } from "../../../types/descritopnType"

interface DescriptionComponentInterface {
    item: DescritopnType
}

const DescriptionComponent: FC<DescriptionComponentInterface> = ({
    item
}) => {
    const { image, title, description } = item
    return(
        <Box
            sx={{
                padding: '48px 33px 60px 33px',
                background: colors.common.white,
                borderRadius: '10px',
                width: 'calc(350px - 33px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                boxShadow: '0px 0px 8.9px 0px #0000001A'
            }}
        >
            {image}
            <Typography variant="subtitle1" sx={{ margin: '32px 0 12px 0' }}>
                {title}
            </Typography>
            <Typography variant="subtitle2">
                {description}
            </Typography>
        </Box>
    )
}

export default DescriptionComponent