import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import Error from "./pages/Error/index";
import Home from "./pages/Home/index";

function App() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  function ProtectedRoute({ isAuthenticated, children }) {
    if (!isAuthenticated) {
      navigate("/login");
    }
    return children;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={!!token}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
