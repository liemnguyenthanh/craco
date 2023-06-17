
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAppDispatch } from '@/store';
import { loginUser } from '@/store/slices/account';
import { ILoginForm } from '@/utils/types/accounts';
import { showNotification } from '@/utils/notification';
import { CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function Copyright(props: any) {
   return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
         {'Copyright © '}
         <Link color="inherit" href="https://chat.openai.com/chat">
            My best friend
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

const maxUsername = 24

const formSchema = yup.object({
   username: yup.string().required().max(maxUsername)
   .matches(/^[a-z0-9_]+$/, 'Username can only contain lowercase letters, and numbers')
   .test('no-spaces', 'Username cannot contain spaces', (value) => !/\s/.test(value)),
   secret: yup.string()
}).required();

export default function LoginPage() {
   const dispatch = useAppDispatch()
   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(formSchema)
   })
   const [user] = useLocalStorage<ILoginForm | null>('user', null)
   const [isLoading, setIsLoading] = React.useState(false)
   const navigate = useNavigate();

   React.useEffect(() => {
      if (user) navigate('/chat');
   }, [navigate, user]);

   const handleLogin = async (data: any) => {
      setIsLoading(true)
      dispatch(loginUser(data))
         .then(() => setIsLoading(false))
         .catch((error) => showNotification(JSON.stringify(error)))
   };

   return (
      <Container component="main" maxWidth="xs">
         <Box
            flexDirection='column'
            display='flex'
            mt={8}
            alignItems='center'
         >
            <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ mt: 1 }}>
               <TextField
                  margin="normal"
                  fullWidth
                  label="username"
                  autoFocus
                  error={!!errors.username}
                  helperText={!!errors.username && errors.username.message}
                  {...register('username')}
               />
               <TextField
                  margin="normal"
                  fullWidth
                  label="Your secret"
                  {...register('secret')}
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{ mt: 3, mb: 2 }}
               >
                  {isLoading ?
                     <CircularProgress size={30} /> :
                     'Sign In'
                  }
               </Button>
            </Box>
         </Box>
         <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
   );
}