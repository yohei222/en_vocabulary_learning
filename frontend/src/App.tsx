import { BrowserRouter } from "react-router-dom";
import AllRoutes from "routes/AllRoutes";
import { AuthContext, useAuthContext } from "contexts/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => {
  const ctx = useAuthContext();

  return (
    <AuthContext.Provider value={ctx}>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </AuthContext.Provider>
  )
}

export default App
