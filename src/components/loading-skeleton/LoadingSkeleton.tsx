"use client"
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { Backdrop } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Define useStyles
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  container: {
    // width: '100%',
    // height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-23px',
  },
  textStyle: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
}));

const SkeletonLoading = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {/* <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" /> */}
      <div className={classes.textStyle}>
        <span>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="primary" />
          </Backdrop>
        </span>
      </div>
    </div>
  );
};

export default SkeletonLoading;
