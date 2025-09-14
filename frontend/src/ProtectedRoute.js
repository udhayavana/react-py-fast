import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />; // redirect if not logged in
  }

  return children; // show page if logged in
}