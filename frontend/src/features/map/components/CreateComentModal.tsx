import { Box, Button, Checkbox, colors, FormControl, FormControlLabel, FormGroup, Modal, TextField, Typography } from "@mui/material"
import { Formik } from "formik"
import { FC } from "react"
import LoadImage from "../../loadImageComponent/LoadImage"
import { AccessibilityListEnum } from "../../../utils/getAccessibilityList"

interface CreateComentModalInterface {
    isOpen: boolean
    handleClose: () => void
}

const CreateComentModal: FC<CreateComentModalInterface> = ({
    isOpen,
    handleClose,
}) => {
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
                    alignItems: 'center'
                }}
            >
                <Formik
                    initialValues={{ 
                        name: '', 
                        address: '', 
                        photos: [], 
                        accessability: [], 
                        ...Object.keys(AccessibilityListEnum).map((value) =>({
                            value: false
                        }))
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
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
                    {/* <LoadImage
                        selectedImage={''}
                        setSelectedImage={(value: string | null) => {

                        }}
                    /> */}
                    <Typography>
                        Назва закладу
                    </Typography>
                    <TextField
                        placeholder="example@gmail.com"
                        id="input-with-icon-textfield"
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
                        placeholder="*******"
                        id="input-with-icon-textfield"
                        type="password"
                        label=""
                        sx={{
                            width: '100%'
                        }}
                        error={!!errors?.address}
                    />
                    
                    <Typography
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
                    </FormGroup>
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