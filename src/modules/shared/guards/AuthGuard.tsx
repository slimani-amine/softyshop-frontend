import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

interface MainLayoutProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: MainLayoutProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/role" />;
};

export default AuthGuard;
