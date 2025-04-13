import { Box, Button, Grid, Paper, Rating, Typography } from "@mui/material"
import { useGetPointQuery } from "./slices/mapSLice"
import { FC, useEffect, useRef, useState } from "react"
import { getAccessibilityList } from "../../../utils/getAccessibilityList"
import { useDispatch } from "react-redux"
import { setValues } from "../../../app/store/detailMarkerSlice"

interface MarkerIconComponentInterface {
    id: number
}

const MarkerIconComponent: FC<MarkerIconComponentInterface> = ({ id }) => {
    const {data} = useGetPointQuery(id)
    const [accessibility, setAccessibility] = useState<any[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (data?.data){
            setAccessibility(getAccessibilityList(data?.data))
            console.log(getAccessibilityList(data?.data))
        }
    }, [data])
    return (
        <Grid
            container
            sx={{
                width: '100%'
            }}
            spacing={4}
        >
            <Grid size={4}>
                <img 
                    style={{
                        width: '200px',
                        height: '200px'
                    }}
                    src={`http://localhost${data?.data?.photos[0]?.photo_url}`} 
                />
            </Grid>
            <Grid 
                size={8}
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}    
            >
                <Typography variant="marker_title">
                    {data?.data?.name}
                </Typography>
                <Typography variant="marker_sub_title">
                    {data?.data?.address}
                </Typography>
                <Rating name="read-only" value={data?.data?.raiting} readOnly />
                <Typography variant="marker_title">
                    Доступність
                </Typography>
                <Box
                    sx={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {accessibility.length > 0 && accessibility?.filter((value) => Object.values(value)[0]).map((value) => {
                        return <Typography variant="marker_list_component">
                            {Object.keys(value)[0]}
                        </Typography>
                        
                    })}
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        variant="contained"
                    >
                        Прокласти маршрут
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            textDecoration: 'none'
                        }}
                        onClick={()=>{
                            dispatch(setValues({
                                isOpen: true,
                                title: data?.data?.name,
                                address: data?.data?.address,
                                accesabilityList: accessibility,
                                comments: data?.data?.comments,
                                raiting: data?.data?.rating,
                                photos: data?.data?.photos,
                                id: data?.data?.id
                            }))
                        }}
                    >
                        i
                    </Button>
                </Box>
            </Grid>
            
        </Grid>
    )
}
export default MarkerIconComponent