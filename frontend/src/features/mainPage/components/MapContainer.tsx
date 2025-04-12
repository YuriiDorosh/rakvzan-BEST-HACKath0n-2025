import { Box, Button, colors } from "@mui/material"
import { descritionItems } from "../assets/descriptionItems"
import { DescritopnType } from "../../../types/descritopnType"
import DescriptionComponent from "./DescriptionComponent"
import MapPage from "../../map/MapPage"
import { useState } from "react"
import { Link } from "react-router-dom"

const MapContainer = () => {
    const [isMapHovered, setIsMapHovered] = useState<boolean>(false)
    return(
        <Box
            sx={{
                background: colors.blue[50],
                borderRadius: '60px 60px 0 0'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}
            >
                {descritionItems?.map((value: DescritopnType, index: number) => {
                    return (
                        <DescriptionComponent
                            key={index}
                            item={value}
                        />
                    )
                })}
            </Box>
            <Box
                sx={{
                    padding: '42px',
                    position: 'relative'
                }}
            >
                <Box
                    onMouseEnter={()=>setIsMapHovered(true)}
                    onMouseLeave={()=>setIsMapHovered(false)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 2,
                        top: 0,
                        opacity: isMapHovered?'1':'0',
                        transition: '0.3s'
                    }}
                >
                    <Link to="/map">
                        <Button variant="contained">
                            відкрити карту
                        </Button>
                    </Link>
                </Box>
                <Box
                    sx={{
                        border: `4px solid ${colors.blue[600]}`,
                        borderRadius: '15px',
                        width: '100%',
                        filter: isMapHovered?'blur(4px)':'blur(0)',
                        transition: '0.3s'

                    }}
                    
                >
                    <MapPage/>
                </Box>
            </Box>
        </Box>
    )
}
export default MapContainer