import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavigationLoginRoute = () => {
  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) navigate("/");
  }, [navigate, userToken]);

  return <Outlet />;
};
export default NavigationLoginRoute;
