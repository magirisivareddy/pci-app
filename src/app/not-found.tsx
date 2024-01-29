import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

const NotFoundPage = () => {
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
        <Typography component="h1" variant="h5" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Link href="/" passHref>
          <Button
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              color: "#fff",
              background: "#4A2D25",
              "&:hover": {
                background: "#5A3D35",
              },
              "&:focus": {
                outline: "2px solid #5A3D35",
              }
            }}
          >
            Go Back to Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
