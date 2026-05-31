import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const loggedIn =
    localStorage.getItem("loggedIn");

  return loggedIn
    ? children
    : <Navigate to="/login" />;
}

export default ProtectedRoute;