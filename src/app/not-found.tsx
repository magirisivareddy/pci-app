"use client"
import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import Link from 'next/link';
import { tokens } from '@/theme/theme';

const NotFoundPage = () => {
    const theme = useTheme();
    const colors = tokens(theme?.palette.mode);
  return (
    <Container component="main" maxWidth="xs" >
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
            color='primary'
            sx={{
                backgroundColor: theme.palette.primary.main, // use theme's primary color
                color: 'white', // assuming you want white text
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark // darker shade on hover
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
