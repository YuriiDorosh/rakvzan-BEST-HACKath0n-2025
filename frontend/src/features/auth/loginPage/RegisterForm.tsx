import { Box, Button, FormControl, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { Formik } from "formik";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const RegisterForm = () =>{
    return (
        <Formik
            initialValues={{ name: '', email: '',  password: '',  repeatPassword: '' }}
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
           <Typography
                sx={{
                    marginTop: '16px',
                }}
            >
                Ім'я
            </Typography>
           <TextField
                placeholder="example@gmail.com"
                id="input-with-icon-textfield"
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
                Пошта
            </Typography>
           <TextField
                placeholder="example@gmail.com"
                id="input-with-icon-textfield"
                label=""
                sx={{
                    width: '100%',
                }}
                error={!!errors?.email}
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
                sx={{
                    width: '100%'
                }}
                error={!!errors?.password}
            />
            <Typography
                sx={{
                    marginTop: '16px',
                }}
            >
                Повторити
            </Typography>
           <TextField
                placeholder="*******"
                id="input-with-icon-textfield"
                type="password"
                sx={{
                    width: '100%'
                }}
                error={!!errors?.repeatPassword}
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
export default RegisterForm