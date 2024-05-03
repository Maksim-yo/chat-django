import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) navigate("/login");
  }, [navigate, userToken]);

  return <Outlet />;
};
export default ProtectedRoute;
