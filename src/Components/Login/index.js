import Login from "../../Services/APIconect";
import PropTypes from "prop-types";
import useToken from "../../Hooks/useToken"

import { useState} from "react";
import * as React from 'react';
import {Redirect} from "react-router-dom"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright ©'}
      <Link color="#80d8ff" href="https://github.com/christopherfulldev/">
        ChambraBook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const LoginComponent = (props) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {token, setToken} = useToken();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const resultToken = await Login.loginAuth({
            userName,
            password
        });
        setToken(resultToken.data);
    };
    
  return (
    <>
    {!!token ? <Redirect to="/profile"/> :
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
              id="text"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={event => setUserName(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <Link href="#" variant="body2" color="#ffeb3b" class="forgot-text">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2" color="#ffeb3b">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>}
    </>
  );
};

LoginComponent.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default LoginComponent;