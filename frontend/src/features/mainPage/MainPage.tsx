import { Box } from "@mui/material"
import Greetings from "./components/Greetings"
import MapContainer from "./components/MapContainer"

const MainPage = () => {
    return(
        <Box
            sx={{
                overflow: 'hidden'
            }}
        >
            <Greetings/>
            <MapContainer/>
        </Box>
    )
}
export default MainPage