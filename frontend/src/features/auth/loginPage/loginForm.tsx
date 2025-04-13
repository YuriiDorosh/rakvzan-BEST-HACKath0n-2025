import { Box, Button, FormControl, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { Formik } from "formik";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLoginMutation } from "../authApi";
import { changeOpenState } from "../../../app/store/authMenuSlice";
import { useDispatch } from "react-redux";
import FaceIcon from '@mui/icons-material/Face';

const LoginForm = () =>{
    const [triggerLogin] = useLoginMutation()
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                // const errors = {email: ''};
                // if (!values.email) {
                // errors.email = 'Required';
                // } else if (
                // !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                // ) {
                // errors.email = 'Invalid email address';
                // }
                // return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                triggerLogin({
                    username: values.email,
                    password: values.password
                }).then((res) => {
                    if (res?.data?.username){
                        localStorage.setItem('username', res?.data?.username)
                        localStorage.setItem('access', res?.data?.access)
                        localStorage.setItem('refresh', res?.data?.refresh)
                        window.location.reload()
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
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit} style={{ width: '80%', marginTop: '24px' }}>
           <FormControl variant="standard" sx={{ width: '100%' }}>
            <Typography>
                Логін
            </Typography>
           <TextField
                placeholder="login"
                id="input-with-icon-textfield"
                name="email"
                onChange={handleChange}
                label=""
                sx={{
                    width: '100%'
                }}
                error={!!errors?.email}
                slotProps={{
                    input: {
                        startAdornment: (
                        <InputAdornment position="start">
                            <FaceIcon />
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
                name="password"
                onChange={handleChange}
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