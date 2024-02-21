// SkeletonLoading.jsx

import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonLoading = () => {
  const containerStyle = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-23px'
  };

  const textStyle = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  };

  return (
    <div style={containerStyle}>
      <Skeleton animation="wave" variant="rectangular" width={"100%"} height={"100%"} />
      <div style={textStyle}>
        <span>
          Loading...
        </span>
      </div>
    </div>
  );
};

export default SkeletonLoading;
