import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../app/services/api/apiService";
import { appApi } from "../app/services/api/apiService";
import { Dispatch } from "@reduxjs/toolkit";
import { reset } from "../features/chat/chatSlice";
const NavigationLoginRoute = () => {
  const { userToken, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userToken && !error) navigate("/");
    else if (error) {
      dispatch(appApi.util.resetApiState());
      dispatch(authApi.util.resetApiState());
      dispatch(reset());
    }
  }, []);

  return <Outlet />;
};
export default NavigationLoginRoute;
