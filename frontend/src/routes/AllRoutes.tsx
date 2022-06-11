/* eslint-disable react-hooks/exhaustive-deps */
import Home from "components/Home";
import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import { AuthContext } from "contexts/AuthContext";
import { getCurrentUser } from "lib/api/auth";
import PATH from 'path/FRONTEND_PATH';
import { useCallback, useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";


const AllRoutes = (): JSX.Element => {
  const { isSignedIn, setIsSignedIn, setIsLoading, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthNavigate = useCallback(async () => {
    try {
      const res = await getCurrentUser();

      const path = location.pathname;
      const AUTH_RELATED_PATH = [PATH.SIGN_IN, PATH.SIGN_UP]

      if ((isSignedIn) || ((res?.data.isLoggedIn))) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);

        if (AUTH_RELATED_PATH.includes(path)) navigate("/home");
      } else {
        navigate((path === PATH.SIGN_IN) ? PATH.SIGN_IN : PATH.SIGN_UP);
      }
    } catch (err) {
      navigate(PATH.SIGN_IN);
    }

    setIsLoading(false);
  }, [])

  useEffect(() => {
    handleAuthNavigate();
  }, [])

  return (
    <Routes>
      <Route path={PATH.SIGN_UP} element={<SignUp />} />
      <Route path={PATH.SIGN_IN} element={<SignIn />} />
      <Route path="/home" element={<PrivateRoute children={<Home />} />} />
    </Routes>
  )
}

export default AllRoutes
