import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../app/services/api/apiService";
import { setCredentials, setAuthError } from "../features/auth/authSlice";
import { skipToken } from "@reduxjs/toolkit/query";

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth);
  const authError = useSelector((state) => state.auth.error);
  const [shouldRender, setShouldRender] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryData, setQueryData] = useState(); // initialize with skipToken to skip at first
  const { data, isFetching, isSuccess, error } = useGetUserDetailsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    } else if (error) dispatch(setAuthError(error));
  }, [data, error]);

  useEffect(() => {
    if (!userToken || (error && error.status === 401)) navigate("/login");
    // else if (isFetching && userToken) setQuer  yData("");
  }, [userToken]);

  // useEffect(() => {
  //   if (authError) navigate("/login");
  // }, [authError]);

  useEffect(() => {
    if (!isFetching && !isSuccess) navigate("/login");
    else if (!isFetching && isSuccess) setShouldRender(true);
  }, [isSuccess, isFetching]);
  if (!shouldRender) return null;
  return <Outlet />;
};
export default ProtectedRoute;
