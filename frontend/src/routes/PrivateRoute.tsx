import { AuthContext } from "contexts/AuthContext";
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PATH from "path/FRONTEND_PATH";
import Loading from "components/Loading";

const PrivateRoute = ({ children }: { children: React.ReactElement }): any => {
  const { isLoading, isSignedIn } = useContext(AuthContext);

  if (isLoading) {
    <Loading />
  } else {
    return isSignedIn ? children : <Navigate to={PATH.SIGN_IN} />;
  }
}

export default PrivateRoute;
