import { Avatar, Box, Button, colors, Rating, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../../app/baseStore";
import CreateComentModal from "./CreateComentModal";

const MarkerDetailView = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const detailMarker = useSelector((state: RootState) => state.detailMarker);


    return(
        <>
        {detailMarker.isOpen &&
        <Box
            sx={{
                position: 'fixed',
                height: '80svh',
                width: {sm: '80swv', md: '20svw'},
                top: '10svh',
                right: '20px',
                background: colors.common.white,
                zIndex: 500,
                borderRadius: '25px',
                padding: '24px'
            }}
        >
            <CreateComentModal
                isOpen={isModalOpen}
                handleClose={()=>{
                    setIsModalOpen(false)
                }}
            />
            {detailMarker?.photos?.length > 0 &&
                <img 
                    src={`http://localhost${detailMarker?.photos[0]?.photo_url}`} 
                style={{
                    width: '100%',
                    height: 'auto'
                }}
                alt="" />
            }
            <Typography
                variant="subtitle1"
            >
                {detailMarker.title}
            </Typography>
            <Typography
                variant="detail_list_subtitle"
                sx={{
                    margin: '12px 0 16px 0'
                }}
            >
                {detailMarker.address}
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)'
                }}
            >
                <Typography variant="marker_title">
                    Доступність:
                </Typography>
                {detailMarker.accesabilityList?.filter((value) => Object.values(value)[0]).map((value) => {
                        return <Typography variant="detail_list_accessability">
                            {Object.keys(value)[0]}
                        </Typography>
                        
                    })}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography>
                    Відгуки:
                </Typography>
                <Rating name="read-only" value={detailMarker.raiting} readOnly />
            </Box>
            <Box
                sx={{
                    maxHeight: '500px',
                    overflowY: 'auto'
                }}
            >
                {detailMarker?.comments?.map((value) => {
                    return(
                        <Box
                            sx={{
                                background: colors.grey[200],
                                borderRadius: '20px',
                                padding: '12px'
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
                })}
            </Box>
            <Button
                variant="contained"
                sx={{
                    width: 'calc(100% - 40px)',
                    position: 'absolute',
                    bottom: '20px'
                }}
                onClick={()=>{
                    setIsModalOpen(true)
                }}
            >
                Написати відгук
            </Button>
        </Box>
        }
        </>
    )
}
export default MarkerDetailView