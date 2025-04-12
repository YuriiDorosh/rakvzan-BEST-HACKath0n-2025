import { Box, Button, FormControl, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { Formik } from "formik";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginForm = () =>{
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {email: ''};
                if (!values.email) {
                errors.email = 'Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                return errors;
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
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit} style={{ width: '80%', marginTop: '24px' }}>
           <FormControl variant="standard" sx={{ width: '100%' }}>
            <Typography>
                Пошта
            </Typography>
           <TextField
                placeholder="example@gmail.com"
                id="input-with-icon-textfield"
                label=""
                sx={{
                    width: '100%'
                }}
                error={!!errors?.email}
                slotProps={{
                    input: {
                        startAdornment: (
                        <InputAdornment position="start">
                            <MailOutlineIcon />
                        </InputAdornment>
                        ),
                    },
                }}
            />
            <Typography
                sx={{
                    marginTop: '16px',
                }}
            >
                Пароль
            </Typography>
           <TextField
                placeholder="*******"
                id="input-with-icon-textfield"
                type="password"
                label=""
                sx={{
                    width: '100%'
                }}
                error={!!errors?.password}
                slotProps={{
                    input: {
                        startAdornment: (
                        <InputAdornment position="start">
                            <LockOutlinedIcon />
                        </InputAdornment>
                        ),
                    },
                }}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{
                    marginTop: '32px'
                }}
            >
                Увійти
            </Button>
            </FormControl>
         </form>
       )}
     </Formik>
    )
}
export default LoginForm