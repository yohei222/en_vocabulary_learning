import { AuthContext } from "contexts/AuthContext";
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PATH from "path/FRONTEND_PATH";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const PrivateRoute = ({ children }: { children: React.ReactElement }): any => {
  const { isLoading, isSignedIn } = useContext(AuthContext);

  if (isLoading) {
    <Box sx={{ width: '100%' }}>
      <LinearProgress color="inherit" />
    </Box>
  } else {
    return isSignedIn ? children : <Navigate to={PATH.SIGN_IN} />;
  }
}

export default PrivateRoute;
