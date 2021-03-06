import "./index.css";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/christopherfulldev/">
        ChambraBook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const FooterComponent = () => {
  return (
   
      <Box className="footer"
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: "6A5ACD"
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Created at Ironhack FullStack Web Development Course
          </Typography>
          <Copyright />
        </Container>
      </Box>
  );
}
export default FooterComponent;