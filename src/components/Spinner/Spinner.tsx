import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const Spinner: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </div>
  );
};
