import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../app/services/api/apiService";
import { setCredentials } from "../features/auth/authSlice";

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.auth);
  const [shouldRender, setShouldRender] = useState();
  const navigate = useNavigate();
  const { data, isFetching, isSuccess } = useGetUserDetailsQuery(
    "userDetails",
    {}
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!userToken || error?.status === 401) navigate("/login");
  }, [navigate, userToken]);
  useEffect(() => {
    if (!isFetching && !isSuccess) navigate("/login");
    else if (!isFetching && isSuccess) setShouldRender(true);
  }, [isSuccess, isFetching]);
  if (!shouldRender) return null;
  return <Outlet />;
};
export default ProtectedRoute;
