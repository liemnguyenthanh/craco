
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
import ThemeMode from '../../components/themeMode';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useAppDispatch } from '../../store';
import { loginUser } from '../../store/slices/account';
import { LoginRequest } from '../../utils/types/accounts';

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

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const [user] = useLocalStorage<LoginRequest | null>('user', null)
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/'); // redirect to dashboard if user is found in local storage
    }
  }, [navigate, user]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget
    const request: LoginRequest = {
      username: form.username.value,
      secret: form.secret.value,
    };
    dispatch(loginUser(request))
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="secret"
            label="Your secret"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <ThemeMode />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}