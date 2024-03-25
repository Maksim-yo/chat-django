import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [navigate, userInfo]);

  return <Outlet />;
};
export default ProtectedRoute;
