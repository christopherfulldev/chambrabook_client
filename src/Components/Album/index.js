import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import APIconnection from '../../Services/APIconect';

import {useState, useRef} from "react";



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/christopherfulldev">
        ChambraBook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




const theme = createTheme();

const AlbumComponent = (props) => {
  const ref = useRef();
  const {
    setPayload
  } = props;
  const [albumFile, setAlbumFile] = useState(null);
  const [albumImageUrl, setAlbumImageUrl] = useState("");

  const handleoNChangeAlbum = (event) => {
    const file = event.target.files[0];
    const pictureUrl = URL.createObjectURL(file);
    setAlbumFile(file);
    setAlbumImageUrl(pictureUrl);
  };

  const handleSubmitAlbumPhoto = async (event) => {
    event.preventDefault();
    const receivedToken = localStorage.getItem("token")
    const username = JSON.parse(localStorage.getItem("payload")).username;
    const uploadedProfilePic = await APIconnection.uploadAlbumPic(albumFile, username, receivedToken);
    setPayload(uploadedProfilePic);
    ref.current.value = "";
  };

  const handleDeleteAlbumPhoto = async (event, photo) => {
    event.preventDefault();
    const receivedToken = localStorage.getItem("token")
    const username = JSON.parse(localStorage.getItem("payload")).username;
    const uploadedProfilePic = await APIconnection.deleteAlbumPic(photo, username, receivedToken);
    setPayload(uploadedProfilePic);
  }

  return (
    <ThemeProvider theme={theme} className="body">
      <CssBaseline />
      
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'inherit',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={handleSubmitAlbumPhoto}>Upload Photos</Button>
              <input type='file' onChange={handleoNChangeAlbum} ref={ref}/>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {props.photos && props.photos.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={card}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={(event)=> handleDeleteAlbumPhoto(event, card)} >Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default AlbumComponent;