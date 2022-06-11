import { AuthContext } from "contexts/AuthContext";
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PATH from "path/FRONTEND_PATH";

const PrivateRoute = ({ children }: { children: React.ReactElement }): any => {
  const { isSignedIn } = useContext(AuthContext);

  return isSignedIn ? children : <Navigate to={ PATH.SIGN_IN } />;
}

export default PrivateRoute;
