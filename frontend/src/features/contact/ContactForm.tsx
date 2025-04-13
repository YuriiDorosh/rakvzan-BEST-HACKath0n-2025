import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import LoadImage from "../loadImageComponent/LoadImage";

const ContactForm = () => {
    return (
        <Formik
            initialValues={{ text: '', image: [] as File[], }}
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
         setValues,
         setFieldValue
         /* and other goodies */
       }) => (
         <form 
            onSubmit={handleSubmit} 
            style={{ 
                width: '100%', 
                margin: '42px 0',
                display: 'flex',
                justifyContent: 'center'
                }}>
           <FormControl 
            variant="standard"
                sx={{ 
                    width: '60%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
            <Typography
                sx={{
                    marginTop: '16px',
                    width: "100%"
                }}
            >
                Повідомлення
            </Typography>
           <TextareaAutosize
                name="text"
                id="text"
                minRows={6}
                value={values.text}
                onChange={event => handleChange(event)}
                style={{
                    width: "100%"
                }}
            />
            <Typography
                sx={{
                    marginTop: '16px',
                    width: "100%"
                }}
            >
                Додати
            </Typography>
            <LoadImage
                selectedFiles={values.image}
                setSelectedFiles={(value: File[]) => setFieldValue('photos', value[0])}
                />
            <Button
                type="submit"
                variant="contained"
                sx={{
                    marginTop: '32px'
                }}
            >
                Надіслати відгук
            </Button>
            </FormControl>
         </form>
       )}
     </Formik>
    )
}

export default ContactForm