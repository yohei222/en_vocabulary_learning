import { BrowserRouter } from "react-router-dom";
import AllRoutes from "routes/AllRoutes";
import { AuthContext, useAuthContext } from "contexts/AuthContext";

const App = (): JSX.Element => {
  const ctx = useAuthContext();

  return (
    <AuthContext.Provider value={ctx}>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
