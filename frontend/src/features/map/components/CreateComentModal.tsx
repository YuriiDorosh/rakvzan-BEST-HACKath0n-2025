import { Box, Button, Checkbox, colors, FormControl, FormControlLabel, FormGroup, Modal, Rating, TextField, Typography } from "@mui/material"
import { Formik } from "formik"
import { FC } from "react"
import LoadImage from "../../loadImageComponent/LoadImage"
import { AccessibilityListEnum } from "../../../utils/getAccessibilityList"
import { usePostCommentMutation } from "../slices/commentSLice"
import { RootState } from "../../../app/baseStore"
import { useSelector } from "react-redux"

interface CreateComentModalInterface {
    isOpen: boolean
    handleClose: () => void
}

const CreateComentModal: FC<CreateComentModalInterface> = ({
    isOpen,
    handleClose,
}) => {
    
    const detailMarker = useSelector((state: RootState) => state.detailMarker);
    const [triggerPostComment] = usePostCommentMutation()

    return(
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
            <Box
                sx={{ 
                    width: '40svw',
                    height: '80svh',
                    background: colors.common.white,
                    padding: '24px',
                    borderRadius:" 25px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'auto',
                    
                }}
            >
                <Formik
                    initialValues={{ 
                        comment: '', 
                        rating: 0, 
                        photos: [] as File[], 
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        triggerPostComment({
                            id: detailMarker.id,
                            photos: values.photos,
                            payload: {
                                comment: values.comment,
                                rating: values.rating
                            }
                        }).then((res) => {
                            window.location.reload()
                        })
                    }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                }) => (
                    <form onSubmit={handleSubmit} style={{ width: '80%', marginTop: '24px' }}>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                    <Typography>
                        Додати
                    </Typography>
                    <LoadImage
                        selectedFiles={values.photos}
                        setSelectedFiles={(value: File[]) => setFieldValue('photos', value)}
                    />
                    <Typography>
                        Коментар
                    </Typography>
                    <TextField
                        rows={6}
                        id="input-with-icon-textfield"
                        label=""
                        name="comment"
                        value={values.comment}
                        onChange={handleChange}
                        sx={{
                            width: '100%'
                        }}
                        error={!!errors?.comment}
                    />
                    <Typography
                        sx={{
                            marginTop: '16px',
                        }}
                    >
                        Оцінка
                    </Typography>
                    
                       
                    <Rating name="read-only" value={values.rating} onChange={(_, value) => {
                        console.log(value)
                        setFieldValue('rating', value)
                    }}/>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            marginTop: '32px'
                        }}
                    >
                        Надіслати заявку
                    </Button>
                    </FormControl>
                    </form>
                )}
                </Formik>
            </Box>
        </Modal>
    )
}

export default CreateComentModal