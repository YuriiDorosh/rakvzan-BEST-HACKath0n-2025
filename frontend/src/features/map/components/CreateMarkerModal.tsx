import { Box, Button, Checkbox, colors, FormControl, FormControlLabel, FormGroup, Modal, TextField, Typography } from "@mui/material"
import { Formik } from "formik"
import { FC } from "react"
import LoadImage from "../../loadImageComponent/LoadImage"
import { AccessibilityListEnum } from "../../../utils/getAccessibilityList"
import { usePostMarkerMutation, usePostPhotosMutation } from "../slices/markerSlices"

interface CreateMarkerModalInterface {
    isOpen: boolean
    handleClose: () => void
    lat: number
    lng: number
}

const CreateMarkerModal: FC<CreateMarkerModalInterface> = ({
    isOpen,
    handleClose,
    lat,
    lng,
}) => {
    const [triggerPostMarker] = usePostMarkerMutation()
    const [triggerPostMarkerPhotos] = usePostPhotosMutation()
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
                    overflowY: 'auto'
                }}
            >
                <Formik
                    validate={values => {
                        const errors = {photos: ''};
                        if (!values.photos || values.photos.length <= 0) {
                            errors.photos = 'Фото є обов\'язкові';
                        }
                        if (errors.photos.length >0) {
                            return errors;
                        }
                    }}
                    initialValues={{ 
                        name: '', 
                        address: '', 
                        photos: [] as File[],
                        // accessability: [], 
                        // ...Object.keys(AccessibilityListEnum).map((value) =>({
                        //     value: false
                        // }))
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        await triggerPostMarker({
                            name: values.name,
                            latitude: lat,
                            longitude: lng,
                            address: values.address,
                        }).then((res: any) => {
                            console.log(res)
                            if (res.data.data.id){
                                triggerPostMarkerPhotos({
                                    photos: values.photos,
                                    id: res.data.data.id,
                                }).then(()=>{
                                    handleClose()
                                    window.location.reload()
                                })
                            }
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
                    /* and other goodies */
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
                    {errors?.photos as string}
                    <Typography>
                        Назва закладу
                    </Typography>
                    <TextField
                        id="input-with-icon-textfield"
                        value={values.name}
                        name={'name'}
                        onChange={handleChange}
                        label=""
                        sx={{
                            width: '100%'
                        }}
                        error={!!errors?.name}
                    />
                    <Typography
                        sx={{
                            marginTop: '16px',
                        }}
                    >
                        Адреса
                    </Typography>
                    <TextField
                        value={values.address}
                        name={'address'}
                        onChange={handleChange}
                        id="input-with-icon-textfield"
                        label=""
                        sx={{
                            width: '100%'
                        }}
                        error={!!errors?.address}
                    />
                    
                    {/* <Typography
                        sx={{
                            marginTop: '16px',
                        }}
                    >
                        Доступність
                    </Typography>
                    <FormGroup>
                        {Object.keys(AccessibilityListEnum).map((value, index) => {
                            return (
                                <FormControlLabel 
                                    key={index}
                                    control={<Checkbox checked={!!values[value as keyof typeof values]} />} 
                                    label={AccessibilityListEnum[value as keyof typeof AccessibilityListEnum]}
                                    onChange={(_, checked) => {
                                        
                                        setFieldValue(value, checked)
                                    }}
                                />
                            )
                        })}
                    </FormGroup> */}
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

export default CreateMarkerModal