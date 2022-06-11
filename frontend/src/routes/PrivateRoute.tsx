import { AuthContext } from "contexts/AuthContext";
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PATH from "path/FRONTEND_PATH";

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isLoading, isSignedIn } = useContext(AuthContext);

  if (!isLoading) {
    return isSignedIn ? children : <Navigate to={ PATH.SIGN_IN } />;
  } else {
    // todo isLoadingモーダルのコンポーネントを作成する？ material uiを使用する？
    return <></>;
  }
}

export default PrivateRoute;
